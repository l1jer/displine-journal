# Shell

## Files

### Create a new file:

```bash
touch ./index.js
mkdir ./a-new-project
```

### Deletion:

```bash
rmdir ./a-new-project
rm ./a-single-file
rm -r ./a-dir (Recursive deletion)
rm -rf ./a-dir-with-files (Recursive Force Deletion)
```

### Move:

```bash
mv ./source/a.txt ./target
mv -f ./source/a.txt ./target  #move n replace
mv -n ./source/a.txt ./target  #move n non-replace
```

### Copy:

```bash
cp ./source/a.txt ./target
cp -R ./source/ ./target  Recursive copy inc. folder
```

### cat/head/tail:

```bash
cat ./package.json  #Read all
head -n 10 ~/.logs/service-a.log  #First 10 lines
tail -n 10 ~/.logs/service-a.log  #Last 10 lines
# -n is the command for how many lines to read
```

### Editing

- GNU nano for Linux, simple n easy to use

- vi/vim: most powerful cli IDE

## Process

### ps

```bash
ps  #current user only
ps -ax  #all users

lsof -i  #open all network related files
lsof -p 2333  #check opened files by process pid=2333
```

### top #check system status in each 5s

### kill

```bash
kill 45934  #SIGTERM signal
kill -9 45934  #SIGKILL signal, force kill process

# 'kill' is a signal sent to process which is not directly kill process
```

### grep

```bash
lsolf -i | grep LISTEN  #Find all listening ports
```

### awk

(This is the key to be professional in bash)

```bash
awk '{pattern + action}' {filenames}
docker rm $(docker ps -a | awk 'NR>l {print $1}')  # Delete all docker containers
chmod +x $(ls -al | awk 'NR>1 {print $9}')  #Add excutive auth for all the files under the current PATH
```

## Variables

### Global

```bash
COURSE=ENGINEERING
export COURSE=ENGINEERING
```

### Local

```bash
local COURSE=ENGINEERING
```

### Environmental

```bash
PATH
HOME
HISTSIZE
LOGNAME
HOSTNAME
SHELL
LANG/LANGUAGE
MAIL
```

### Basic types

```bash
# String
ASTRING=fagfff
ASTRING='sfsdgfdsgg'

# NUmber
ANUMBER=$[1+1]
ANUMBER=$((1+1))

# Array
ANARRAY=(what\'s the day today)
ANARRAY=(1 2 3 4 5)
ANARRAY[1]=0
```

### Calculation

#### Combination

```
ASTRING=fdsggf
ANUMBER=$((1+1))

STR='The alphabet starts with $ASTRING'
echo $STR  # The alphabet starts with fdsggf

SEQ=(1 $ANUMBER 3 4 5)
echo $SEQ  # 1 2 3 4 5
```

### COndition

#### if then

```bash
if condition1
then
    condition1
elif condition2
then
    command2
else
    commandN
fi
```

#### case

```bash
case $VAR in
    condition1)
        command1
        ;;
    condition2)
        echo command2
        ;;
    *)
        echo command3
        ;;
esac
```

#### Comparision

```bash
-z var  #is 'var' empty?*
-d file  #is 'file' exist also a folder?*
-e file  #is 'file' exist?*
-f file  #is 'file' exist also a file?*
-r file  #is 'file' exist also readable?
-s file  #is 'file' exist also not empty?*
-w file  #is 'file' exist also writable?
-x file  #is 'file' exist also excutable?
-O file  #is 'file' exist also belongs to current user?
-g file  #is 'file' exist also default group is same as current user?
file1 -nt file2  #is 'file2' newer?
file1 -ot file2  #is 'file1' older?

# '*' means those are used often
```

### Loop

### for

```bash
for index in 1 2 3 4 5; do
    echo 'index='$index
done

for ((i=0;i<5;i++)); do
    echo $i
done
```

### while

```bash
while(( $i<=10))do
    echo $i
done
```
