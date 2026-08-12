The complete workflow
git checkout master
git status
git add .
git commit -m "Your update message"
git pull origin master
git push origin master
git push personal master:master

That is the workflow I recommend permanently.

If git push personal master:master is rejected

That means the personal repository has a different history.

Use this only for your personal backup repository:

git push --force-with-lease personal master:master

--force-with-lease is safer than --force because it checks that the remote has not changed unexpectedly.

Commands you should NEVER use

Do not use these:

git checkout personal/master
git checkout -b personal/master personal/master

Those commands move you to the old personal branch and make it look like your new code disappeared.

Make it even safer

Delete the local personal/master branch so you can never accidentally switch to it.

Run once:

git checkout master
git branch -D personal/master

This does not delete the remote repository. It only removes the confusing local branch.

My recommended alias workflow

Think of it as one local branch, two backups.

master = your working branch

origin/master = GitHub main repository

personal/master = your backup repository

You never develop on personal/master. You only copy master to it.

If you follow the sequence above, you will not lose code, you will avoid overwrite problems, and you will almost never see the merge errors you encountered today.