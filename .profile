# https://stackoverflow.com/questions/40635533/why-does-the-npm-userconfig-not-get-picked-up/52316526
# https://github.com/nodejs/help/wiki/Installation
# https://www.tutorialspoint.com/nodejs/nodejs_environment_setup.htm
# https://github.com/nvm-sh/nvm

# Define prompt
export PS1='\e[0;32m$(pwd)/ $ \e[m'

. .env/export-os.sh
echo export OS=$OS

. .env/export-platform.sh
echo export PLATFORM=$PLATFORM

# Set nodejs version
export NODE_VERSION=v12.16.1
echo export NODE_VERSION=$NODE_VERSION

# Configure debugging port
export NODE_DEBUG_PORT=36688
echo export NODE_DEBUG_PORT=$NODE_DEBUG_PORT

# Export known directories
export KJS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
export KJS_ENV_DIR="$KJS_DIR/.env"
export KJS_OS_DIR="$KJS_ENV_DIR/$OS"
export KJS_ARCH_DIR="$KJS_OS_DIR/$PLATFORM"
export KJS_NVM_DIR="$KJS_ARCH_DIR/nvm"
export KJS_NODE_DIR="$KJS_NVM_DIR/versions/node/$NODE_VERSION/bin"
export KJS_NODE_EXT_DIR="$KJS_DIR/.npm"
export KJS_EXT_DIR="$KJS_DIR/.npm"

# Export known files
export KJS_PROFILE="$KJS_DIR/.profile"

# Clean aliases
unalias -a

# Define KJS aliases
alias re=". $KJS_PROFILE"
alias r="pd $KJS_DIR"
alias cdos="pd $KJS_OS_DIR"
alias cdnvm="pd $KJS_NVM_DIR"
alias cdarch="pd $KJS_ARCH_DIR"
alias cdnode="pd $KJS_NODE_DIR"
alias cdext="pd $KJS_NODE_EXT_DIR"

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
restore() {
  if [[ -d $NVM_EXT_DIR/.cache && ! -d $NVM_DIR/.cache ]] 
    then
      echo - Linking to external nvm cache $NVM_EXT_DIR/.cache
      ln -s $NVM_EXT_DIR/.cache $NVM_DIR/.cache
  fi

  echo
  echo - Install npm $NODE_VERSION
  nvm i $NODE_VERSION

  echo
  echo - Restore external node packages
  pd $KJS_EXT_DIR && npm i && pod

  echo
  echo - Install profiler c8
  npm i -g c8
}
dbg() {
  node --inspect-brk=$NODE_DEBUG_PORT "$@"
}

# Export node directory
export NODE_DIR=$KJS_NODE_DIR
echo export NODE_DIR=$KJS_NODE_DIR

# Export nvm directory
export NVM_DIR=$KJS_NVM_DIR
echo export NVM_DIR=$KJS_NVM_DIR

export NVM_EXT_DIR=~/.nvm
echo export NVM_EXT_DIR=$KJS_NVM_DIR

# Strip path
export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:$KJS_NODE_DIR
echo export PATH=$PATH

. "$KJS_ENV_DIR/aliases.sh"
. "$KJS_ENV_DIR/load-nvm.sh"
