# https://stackoverflow.com/questions/40635533/why-does-the-npm-userconfig-not-get-picked-up/52316526
# https://github.com/nodejs/help/wiki/Installation
# https://www.tutorialspoint.com/nodejs/nodejs_environment_setup.htm
# https://github.com/nvm-sh/nvm

# path
export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin

# command prompt
export PS1='\e[0;32m$(pwd)/ $ \e[m'

# default aliases
. "$KJS_ENV_DIR/aliases.sh"

# root
export KJS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
alias r="pd $KJS_DIR"

# profile
export KJS_PROFILE="$KJS_DIR/.profile"
alias re=". $KJS_PROFILE"

# environment
export KJS_ENV_DIR="$KJS_DIR/.env"
alias cdenv="pd $KJS_ENV_DIR"

# os
. "$KJS_ENV_DIR/export-os.sh"
export KJS_OS_DIR="$KJS_ENV_DIR/$OS"
alias cdos="pd $KJS_OS_DIR"

# architecture
. "$KJS_ENV_DIR/export-platform.sh"
export KJS_ARCH_DIR="$KJS_OS_DIR/$PLATFORM"
alias cdarch="pd $KJS_ARCH_DIR"

# nvm
. "$KJS_ENV_DIR/load-nvm.sh" "$KJS_ARCH_DIR/nvm"
export KJS_NVM_DIR="$KJS_ARCH_DIR/nvm"
alias cdnvm="pd $NVM_DIR"

# nodejs version
export NODE_VERSION=v12.16.1

# install nodejs itself
echo installing nodejs $NODE_VERSION
nvm i $NODE_VERSION | sed 's/^/-  /'
echo

# nodejs
export NODE_DIR="$NVM_DIR/versions/node/$NODE_VERSION/bin"
export PATH=$PATH:$NODE_DIR
alias cdnode="pd $NODE_DIR"

# nodejs debugging port
export NODE_DEBUG_PORT=36688
dbg() {
  node --inspect-brk=$NODE_DEBUG_PORT "$@"
}

# npm ref
export KJS_EXT_DIR="$KJS_DIR/.npm"
alias cdext="pd $KJS_NODE_EXT_DIR"

# npm install external packages
echo installing npm packages
pd $KJS_EXT_DIR && npm i --no-progress | sed 's/^/-  /' && p
echo

# c8 code coverage
#echo install code-coverage tool 'c8'...
#npm i -g c8 --no-progress
#alias cov="c8 -o .coverage node .test/index.js && c8 report -o .coverage -r lcov"

# Define functions
link_packages() {
  pd $KJS_DIR
  link_package "package/create/package-json"
  link_package "package/create/dependencies-js"
  pod
}
link_package() {
  pd $1
  echo - Linking $1
  npm link > /dev/null
  pod
}