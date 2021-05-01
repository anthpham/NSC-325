import os

while 1:
    res = input("Enter \"app\" to launch webapp or \"refresh\" to update network data: ")
    if res == "app" or res == "a":
        os.system("npm start &")
    elif res == "refresh" or res == "r":
        os.system("python3 sniffer.py")
    else:
        print("Incorrect input, try again...")