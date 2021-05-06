import os

while 1:
    res = input("Enter \"app\" to launch webapp or \"refresh\" to update network data: ")
    if res == "app" or res == "a":
        os.system("npm start &")
        os.system("cd backend; node index.js &")
    elif res == "refresh" or res == "r":
        os.system("sudo python3 sniffer.py -d")
    else:
        print("Incorrect input, try again...")