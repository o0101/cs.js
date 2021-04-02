# Study Plan for Linux System Internals

- One thing I should study is interrupts, IVT and IDT.
- One thing I think I should study things based on the /proc filesystem. Go through that and read the sections that seem important. This main trunk then branches off in many smaller branches that include system calls and APIS (read(2), execve(2), epoll(2), etc)
- Memory
- File access
- IPC

Another thing I should study is:
- ptrace (the call)
- strace (the command)
- netcat / nc
- gdb
- kdb, kgdb 
- uname
- vmstat
- dstat
- ftrace
- https://github.com/brendangregg/perf-tools
- bash programming

Also: study http://www.brendangregg.com/
Also: https://www.kernel.org/doc/html/v4.14/index.html
Also books by Tannenbaum
Also: 6.828

Basically, "but in order to pass the linux systems internals interview you need to know the linux system very well and know everyhing that happens in every step in as many details as possible."

Questions
- What is a lock? Give an example of a lock and a lock-free algorithm in the linux kernel
- What happens when a lock is contested?
- What is a cache line?
- What is branch prediction?
- How is an LRU cache implemented?
- What information is not in the inode?
- What part of the tcp header does traceroute modify?
- How do you make a process a service?
- What is a zombie process?
- Given output of command vmstat and analyze the system?
- Send packets to remote machines and try to upgrade the packet remotely (this could be wake on lan). Troubleshooting why some of the machines are not updated. Alternately you mean packages, and then you can 
- How does strace work?
- List ways to catch a signal for a program you don't have source code for?
- If you had a program that needed 1TB of RAM and you only have 16GB, how does the linux system allocate memory?
- Database is running slow in production, why might this be the case?
- What does $? mean in bash (exit code of last exited command)
- What happens when you press the button on a linux box to boot the system?
- Explain memory paging?
- How would you handle processing large datasets in a constrained environment? (constrained how? disk? memory? cpu? network? what kind of data, how is the data accessed (disk, network, streamed, already in memory)
- 'httpd' is not serving files from '/var/www/html'. Why might this be happening? How might you go about diagnosing and fixing this?
- How do you see which disks are currently mounted?
- Explain containerization? (cgroups etc)
- How would you troubleshoot a system in which you are not able to start an application on the server?
- What signal is sent to a parent process when a child terminates?
- What is swap space?
- What happens when you type ls -l in terminal? inodes, sys calls etc
- How do you determine if a drive is full?
- How does malloc allocate memory in linux?
- How would you troubleshoot a system that is running "slow"?
- Another thing I should study is signals. 
  Kill sends which signal?
- How call goes from user space to kernel space?
- Memory layout of a process?
- Stack overflow, heap overflow?
- Why would a process die or not die?
- Kill vs term how do you do it in C?
