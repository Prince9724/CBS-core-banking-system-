Your future workflow (no more confusion)

You only need one local branch: master.

When you finish work:

git add .
git commit -m "your message"
git pull origin master
git push origin master
git push personal master:master

Never do git checkout personal/master again. That checks out the old branch and changes your working directory. You do not need it for backups.




