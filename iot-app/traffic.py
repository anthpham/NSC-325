import subprocess as sub
import sys


def main():
    print("Hello World!")
    if len(sys.argv) > 2:
        print("Too many arguments. )
    p = sub.Popen(("sudo", "tcpdump", "-l"), stdout=sub.PIPE)
    for row in iter(p.stdout.readline, b""):
        print(row.rstrip())  # process here


if __name__ == "__main__":
    main()