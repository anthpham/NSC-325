import os
from parse import *

# Parses the arp table
mac_addies = os.popen('arp -a').read()
string_list = mac_addies.split('\n')
mac_list = []
for count,entry in enumerate(string_list):
    temp = parse('? ({}) at {} on en0 ifscope [ethernet]', entry)
    if temp == None:
        temp2 = parse('? ({}) at {} on en0 ifscope permanent [ethernet]', entry)
        if temp2 == None:
        else:
            mac_list.append(temp2.fixed)
    else:
        mac_list.append(temp.fixed)