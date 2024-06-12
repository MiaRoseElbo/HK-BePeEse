import os
import re

def rename_files(directory):
    # Get a list of all files in the directory
    files = os.listdir(directory)
    # Filter out only the files that match the expected pattern
    files = [file for file in files if file.startswith('COL ') and file.endswith('.jpg')]

    for file in files:
        # Use regex to extract the number from the original filename
        match = re.search(r'COL (\d+)', file)
        if match:
            number = match.group(1).strip()
            # Create the new filename
            new_name = f"{number.zfill(3)}.jpg"
            # Rename the file
            os.rename(os.path.join(directory, file), os.path.join(directory, new_name))
            print(f"Renamed: {file} -> {new_name}")
        else:
            print(f"No match found for {file}")

# Set the directory containing the files
directory = '/Users/miaelbo/HK/HK-BePeEse/public/images/col'

# Call the rename function
rename_files(directory)