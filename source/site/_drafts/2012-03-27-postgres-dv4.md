---
layout: posts
title: PostgreSQL 8.4 on a Media Temple (dv) Server
slug: postgres-dv4
date: 2012-03-27T20:30:30
snippet: 'Getting the latest version of PostgrSQL running on A Media Temple (dv) Server'
---

### Preface

Last week Django 1.4 was officially released. With it brought a lot of new features, so I wanted to upgrade most of my projects as soon as I could. I use Heroku for almost all of my Django apps, and have a (dv) server from Media Temple for serving static content and database hosting. Up until Django's new release, this worked really well. I soon discovered a problem though. A minimum of PostgreSQL 8.2 is now required. My server only had 8.1.

### The Problem

Now, there are all kinds of tutorials and guides walking you through an install or upgrade of PostgreSQL 8.x to other versions, including 9. What these guides fail to take into account is servers with the Plesk webadmin interface also running. According to Plesk's release notes (which itself is hard to find), they only support up yo __8.4__. You can go with the 9.X branch, but then we miss out on the Plesk integration, and the ability to manage Postgres databases from the admin web interface.

One of the few nice things about Plesk is it comes with a handy updater/installer that will actually occasionally work. It can be accessed by running (as root, or anything equivalent):

<pre class="terminal">/usr/local/psa/admin/sbin/autoinstaller</pre>

After fixing a few errors, I successfully updated to the latest version of Plesk (10.4.4). While Plesk claims the auto-installer <strong>should</strong> install PostgreSQL to 8.4, they are wrong when it comes to CentOS 5. Instead, it only installs the 8.1 branch.

### The Solution

If you attempt to install via Yum, you will presented with two separate packages: 'postgresql' (8.1 branch) and 'postgresql84' (8.4.x branch). Either will install just fine. The server will start, and you can even start using it. While both technically work, only the 8.1 package will be recognized by Plesk. So, how do we solve this? We need to manually grab the latest 8.4 RPM package from PostgreSQL servers.

First, we'll need to remove any and all existing packages:

<pre class="terminal">yum remove postgresql</pre>

And hide the current packages in the yum repo, by editing <strong>/etc/yum.repos.d/CentOS-Base.repo</strong> and adding this line to the <strong>base</strong> and <strong>updates</strong> sections:

<pre class="terminal">exclude=postgresql*</pre>

This will tell yum to ignore packages from the normal repos, and only display the packages from the <span class="caps">RPM</span> we'll be using. So next we get PostgreSQL 8.4 directly from the PostgreSQL servers:

<pre class="terminal">wget http://yum.postgresql.org/8.4/redhat/rhel-5-x86_64/pgdg-centos-8.4-3.noarch.rpm</pre>

And install the rpm distribution:

<pre class="terminal">rpm -ivh pgdg-centos-8.4-3.noarch.rpm</pre>

From there we can install PostgreSQL like usual:

<pre class="terminal">
yum list postgres*
yum install postgresql-server
service postgresql initdb
chkconfig postgresql on
service postgresql start
</pre>

Next we begin the process of letting Plesk access it, by adding our Plesk admin account (make sure to use the same username/password as the plesk account):

<pre class="terminal">
su postgres
createuser -slPE
</pre>

We're done as the Postgres user, so you can exit out of it:

<pre class="terminal">exit</pre>

Enable access for you to allow logins from the (dv) server. Edit <strong>/var/lib/pgsql/data/pg_hba.conf</strong> and comment out the line:
<pre class="terminal">all all 127.0.0.1/32 ident</pre>

And add this line:
<pre class="terminal">all all 127.0.0.1/32 md5</pre>

Finally, we can register PostgreSQL 8.4 with Plesk by using the command:

<pre class="terminal">
/usr/local/psa/bin/database-server --update-server localhost:5432 -type postgresql -admin admin -passwd `cat /etc/psa/.psa.shadow` &amp;&amp; service psa restart</pre>

If all went well, PostgreSQL 8.4 will finally be installed and accesible through Plesk/pgAdmin!
