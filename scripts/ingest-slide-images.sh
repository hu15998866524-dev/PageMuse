#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
IMAGE_DIR="$ROOT_DIR/public/images/slides"
DATA_FILE="$ROOT_DIR/lib/data.ts"
DIMENSIONS_FILE="$ROOT_DIR/lib/slide-image-dimensions.ts"

if [[ ! -d "$IMAGE_DIR" ]]; then
  echo "Missing image directory: $IMAGE_DIR" >&2
  exit 1
fi

if [[ ! -f "$DATA_FILE" ]]; then
  echo "Missing data file: $DATA_FILE" >&2
  exit 1
fi

generate_dimensions_file() {
  {
    echo "export const slideImageDimensions: Record<string, { width: number; height: number }> = {"

    while IFS= read -r file; do
      name="${file:t}"
      [[ "$name" == ".DS_Store" ]] && continue
      [[ ! "$name" =~ '^slide-([0-9]{3})\.[A-Za-z0-9]+$' ]] && continue

      slide_id="${name%.*}"
      width="$(sips -g pixelWidth "$file" 2>/dev/null | awk 'NR==2 { print $2 }')"
      height="$(sips -g pixelHeight "$file" 2>/dev/null | awk 'NR==2 { print $2 }')"

      if [[ -n "$width" && -n "$height" ]]; then
        echo "  \"$slide_id\": { width: $width, height: $height },"
      fi
    done < <(find "$IMAGE_DIR" -maxdepth 1 -type f | sort)

    echo "};"
  } > "$DIMENSIONS_FILE"

  echo "Updated ${DIMENSIONS_FILE:t}"
}

typeset -a existing_numbers
while IFS= read -r file; do
  name="${file:t}"
  if [[ "$name" =~ '^slide-([0-9]{3})\.[A-Za-z0-9]+$' ]]; then
    existing_numbers+=("${match[1]}")
  fi
done < <(find "$IMAGE_DIR" -maxdepth 1 -type f | sort)

max_number=0
for num in "${existing_numbers[@]:-}"; do
  (( 10#$num > max_number )) && max_number=$((10#$num))
done

typeset -a pending_files
while IFS= read -r file; do
  name="${file:t}"
  [[ "$name" == ".DS_Store" ]] && continue
  [[ "$name" =~ '^slide-[0-9]{3}\.[A-Za-z0-9]+$' ]] && continue
  pending_files+=("$file")
done < <(find "$IMAGE_DIR" -maxdepth 1 -type f | sort)

if [[ ${#pending_files[@]} -eq 0 ]]; then
  echo "No pending images found in $IMAGE_DIR"
  generate_dimensions_file
  exit 0
fi

echo "Found ${#pending_files[@]} pending image(s)."

for old_path in "${pending_files[@]}"; do
  max_number=$((max_number + 1))
  slide_id=$(printf "slide-%03d" "$max_number")
  ext="${old_path:e}"
  ext="${ext:l}"
  new_name="${slide_id}.${ext}"
  new_path="$IMAGE_DIR/$new_name"

  mv "$old_path" "$new_path"
  echo "${old_path:t} -> $new_name"

  perl -0pi -e "s/(id: \"$slide_id\",.*?coverImage: )\"[^\"]+\"/\${1}\"\\/images\\/slides\\/$new_name\"/s" "$DATA_FILE"
done

generate_dimensions_file
echo "Image ingestion complete."
