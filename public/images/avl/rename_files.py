import os

def rename_files(directory):
    # Get a list of all files in the directory
    files = os.listdir(directory)
    # Filter out only the files that match the expected pattern
    files = [file for file in files if file.startswith('AVL-') and file.endswith('.png')]

    for file in files:
        # Extract the number from the original filename
        number = file.split('-')[1].split('.')[0].strip()
        # Create the new filename
        new_name = f"{number.zfill(3)}.jpg"
        # Rename the file
        os.rename(os.path.join(directory, file), os.path.join(directory, new_name))
        print(f"Renamed: {file} -> {new_name}")

# Set the directory containing the files
directory = '/Users/miaelbo/HK/HK-BePeEse/public/images/avl'

# Call the rename function
rename_files(directory)