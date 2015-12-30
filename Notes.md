#CEF client native,  app using CEF
https://bitbucket.org/chromiumembedded/cef/wiki/Tutorial#markdown-header-linux
## download the codes from here

https://cefbuilds.com/

```
cd cefsimple
cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release ..
make -j4 cefclient cefsimple

```