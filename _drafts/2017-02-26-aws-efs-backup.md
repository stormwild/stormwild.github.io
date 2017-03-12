---
title: AWS EFS Backup
permalink: aws-efs-backup
---

Notes on AWS EFS Backup

Create a backup file from one efs mount to another 

Where src is the mounted efs directory to copy from and efs is the destination

@TODO backup to s3 instead

```
#!/bin/sh

date=`date "+%Y-%m-%dT%H:%M:%S"`
HOME=/home/ubuntu

rsync -aP --delete --delete-excluded --exclude-from=$HOME/.rsync/exclude --link-dest=$HOME/efs/current/latest $HOME/src $HOME/efs/backups/backup-$date
rm -f $HOME/efs/current/latest
ln -s $HOME/efs/backups/backup-$date $HOME/efs/current/latest
```

Create cron to run backup daily



Delete oldest backup after 3 backups

```
#!/usr/bin/env bash

dir="$1"
min_dirs=3

[[ $(find "$dir" -maxdepth 1 -type d | wc -l) -ge $min_dirs ]] &&
IFS= read -r -d $'\0' line < <(find "$dir" -maxdepth 1 -printf '%T@ %p\0' 2>/dev/null | sort -z -n)
file="${line#* }"
ls -lLd "$file"
```

@TODO delete file

@TODO create cron to delete old backups


Resources:

- [Back Up an EFS File System](http://docs.aws.amazon.com/efs/latest/ug/efs-backup.html)
- [How to delete the oldest directory in a given directory?](http://unix.stackexchange.com/questions/28939/how-to-delete-the-oldest-directory-in-a-given-directory)
- [Easy Automated Snapshot-Style Backups with Linux and Rsync](http://www.mikerubel.org/computers/rsync_snapshots)
- [Time Machine for every Unix out there](https://blog.interlinked.org/tutorials/rsync_time_machine.html)
- [RSYNC](https://rsync.samba.org/)
- [compare files in two directory on remote server using unix](http://stackoverflow.com/questions/19396718/compare-files-in-two-directory-on-remote-server-using-unix)
