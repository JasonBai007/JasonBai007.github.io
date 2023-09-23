yarn build
git add .
git commit -m 'build and release'
git push
scp -r ./docs/* root@18.183.62.177:/home/hello