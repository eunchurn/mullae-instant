import shell from "shelljs";
import "dotenv/config";

if (!shell.which("git")) {
  shell.echo('Sorry, this script requires "git"');
  shell.exit(1);
}

const Status = shell.exec("git status");
const checkRemote = shell.exec("git remote -v | grep client");
if (!checkRemote.includes("client")) {
  shell.echo(
    `No remote deployment repository, adding.. client to ${process.env.DEPLOYMENT_REPOSITORY}`,
  );
  shell.exec(`git remote add client ${process.env.DEPLOYMENT_REPOSITORY}`);
}
if (Status.stdout.includes("nothing to commit, working tree clean")) {
  shell.echo("Working directory clean: Deploying start!");
  shell.sed("-i", "dist", "", "./.gitignore");
  shell.exec("git add .");
  shell.exec('git commit -m "Edit .gitignore to deploy"');
  shell.exec(
    "git push deploy `git subtree split --prefix dist gh-pages`:gh-pages --force",
  );
  shell.exec("git reset HEAD~");
  shell.exec("git checkout .gitignore");
} else {
  shell.echo("Need clean working directory to deploy");
}
