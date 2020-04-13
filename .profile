# https://stackoverflow.com/questions/40635533/why-does-the-npm-userconfig-not-get-picked-up/52316526
# https://github.com/nodejs/help/wiki/Installation
# https://www.tutorialspoint.com/nodejs/nodejs_environment_setup.htm
# https://github.com/nvm-sh/nvm

# Get the Kernel Name
export OS=$(uname -s)
case "$OS" in
  Linux) OS="linux" ;;
  Darwin) OS="mac" ;;
  FreeBSD) OS="freebsd" ;;
* ) echo "Your Operating System `$OS` is not supported" ;;
esac

# Get the machine Architecture
export PLATFORM=$(uname -m)
case "$PLATFORM" in
  x86) PLATFORM="x86" ;;
  ia64) PLATFORM="ia64" ;;
  i?86) PLATFORM="x86" ;;
  amd64) PLATFORM="amd64" ;;
  x86_64) PLATFORM="x64" ;;
  sparc64) PLATFORM="sparc64" ;;
* ) echo "Your Architecture '$PLATFORM' is not supported." ;;
esac

# Echo header
echo "KingJS, $OS ($PLATFORM)"

# Set nodejs version
export NODE_VERSION=v12.16.1

# Configure debugging port
export KJS_DEBUG_PORT=36688

# Export known directories
export KJS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
export KJS_ENV_DIR="$KJS_DIR/.env"
export KJS_OS_DIR="$KJS_ENV_DIR/$OS"
export KJS_ARCH_DIR="$KJS_OS_DIR/$PLATFORM"
export KJS_NVM_DIR="$KJS_ARCH_DIR/nvm"
export KJS_NODE_DIR="$KJS_NVM_DIR/versions/node/$NODE_VERSION/bin"
export KJS_NODE_EXT_DIR="$KJS_DIR/.npm"
export KJS_EXT_DIR="$KJS_DIR/.npm"

# Export nvm/nodejs known dirs
export NODE_DIR=$KJS_NODE_DIR
export NVM_DIR=$KJS_NVM_DIR
export NVM_EXT_DIR=~/.nvm

# Export known files
export KJS_PROFILE="$KJS_DIR/.profile"

# Define prompt
export PS1='\e[0;32m$(pwd)/ $ \e[m'

# Define functions
pd() { pushd $1 > /dev/null; }
pod() { popd > /dev/null; }
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
  node --inspect-brk=$KJS_DEBUG_PORT "$@"
}

# Define aliases
unalias -a
alias clean="git clean . -fxd"
alias e="env | sort"
alias re=". $KJS_PROFILE"
alias pd="pd"
alias r="pd $KJS_DIR"
alias cdos="pd $KJS_OS_DIR"
alias cdnvm="pd $KJS_NVM_DIR"
alias cdarch="pd $KJS_ARCH_DIR"
alias cdnode="pd $KJS_NODE_DIR"
alias cdext="pd $KJS_NODE_EXT_DIR"
alias p="pod"
alias pp="pod && p"
alias ppp="pod && pp"
alias pppp="pod && ppp"
alias u="cd .."
alias uu="u && cd .."
alias uuu="uu && cd .."
alias uuuu="uuu && cd .."
alias cov="c8 -o .coverage node .test/index.js && c8 report -o .coverage -r lcov"

# Strip path
export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:$KJS_NODE_DIR

# Load NVM
export NVM_DIR=$KJS_NVM_DIR
[ -s "$KJS_NVM_DIR/nvm.sh" ] && \. "$KJS_NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$KJS_NVM_DIR/bash_completion" ] && \. "$KJS_NVM_DIR/bash_completion"  # This loads nvm bash_completion