# https://stackoverflow.com/questions/40635533/why-does-the-npm-userconfig-not-get-picked-up/52316526
# https://github.com/nodejs/help/wiki/Installation
# https://www.tutorialspoint.com/nodejs/nodejs_environment_setup.htm
# https://github.com/nvm-sh/nvm

export_os() {
  export OS=$(uname -s)
  case "$OS" in
    Linux) OS="linux" ;;
    Darwin) OS="mac" ;;
    FreeBSD) OS="freebsd" ;;
  * ) echo "Your Operating System `$OS` is not supported" ;;
  esac
}

export_platform() {
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
}

set_default_aliases() {
  alias pa="alias -p"
  alias clean="git clean . -fxd"
  alias e="env | sort"
  alias pd="pd"
  alias p="pod"
  alias pp="pod && p"
  alias ppp="pod && pp"
  alias pppp="pod && ppp"
  alias u="cd .."
  alias uu="u && cd .."
  alias uuu="uu && cd .."
  alias uuuu="uuu && cd .."

  pd() { pushd $1 > /dev/null; }
  pod() { popd > /dev/null; }

  alias ports="lsof -i -P -n | grep LISTEN"
}

load_nvm() {
  export NVM_DIR=$1
  export NVM_EXT_DIR=~/.nvm

  if [[ -d $NVM_DIR && -d $NVM_EXT_DIR/.cache && ! -d $NVM_DIR/.cache ]] 
    then
      echo linking \$NVM_DIR/.cache -\> \$NVM_EXT_DIR/.cache
      ln -s $NVM_EXT_DIR/.cache $NVM_DIR/.cache
  fi

  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" --no-use  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion  
}

# clear aliases
unalias -a

# path
export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin

# command prompt
export PS1='\e[0;32m$(pwd)/ $ \e[m'

# root
export KJS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
alias r="pd $KJS_DIR"

# profile
export KJS_PROFILE="$KJS_DIR/.profile"
alias re=". $KJS_PROFILE"

# environment
export KJS_ENV_DIR="$KJS_DIR/.env"
alias cdenv="pd $KJS_ENV_DIR"

# default aliases
set_default_aliases

# os
export_os
export KJS_OS_DIR="$KJS_ENV_DIR/$OS"
alias cdos="pd $KJS_OS_DIR"

# architecture
export_platform
export KJS_ARCH_DIR="$KJS_OS_DIR/$PLATFORM"
alias cdarch="pd $KJS_ARCH_DIR"

# nodejs version
export NODE_VERSION=v12.16.1

# nvm
load_nvm "$KJS_ARCH_DIR/nvm"
export KJS_NVM_DIR="$KJS_ARCH_DIR/nvm"
alias cdnvm="pd $NVM_DIR"

# install nodejs itself
echo installing nodejs $NODE_VERSION
nvm i $NODE_VERSION | sed 's/^/-  /'
echo
export NO_UPDATE_NOTIFIER=1

# nodejs
export NODE_DIR="$NVM_DIR/versions/node/$NODE_VERSION/bin"
export PATH=$PATH:$NODE_DIR
alias cdnode="pd $NODE_DIR"

# nodejs debugging port
export NODE_DEBUG_PORT=36688
dbg() {
  node --inspect-brk=$NODE_DEBUG_PORT "$@"
}

# npm external 
export KJS_EXT_DIR="$KJS_DIR/.npm"
alias cdext="pd $KJS_EXT_DIR"

# npm install external packages
echo installing npm packages
pd $KJS_EXT_DIR && npm i --no-progress | sed 's/^/-  /' && p
echo

# link external tools
export KJS_EXT_MOD_DIR="$KJS_EXT_DIR/node_modules"

# c8
alias c8="node $KJS_EXT_MOD_DIR/c8/bin/c8.js $*"
alias cov="c8 -o .coverage node .test/index.js && c8 report -o .coverage -r lcov"

# dogfood
export KJS_DOGFOOD_STABLE="$KJS_ENV_DIR/kingjs"

# cdj
export CDJ_REL_PATH="/package/create/dependencies-js/exe.js"
alias cdj_="node ${KJS_DOGFOOD_STABLE}${CDJ_REL_PATH} $*"
alias cdj="node ${KJS_DIR}${CDJ_REL_PATH} $*"
alias cdjd="dbg ${KJS_DIR}${CDJ_REL_PATH}"

# cpk
export CPK_REL_PATH="/package/create/package-json/exe.js"
alias cpk_="node ${KJS_DOGFOOD_STABLE}${CPK_REL_PATH} $*"
alias cpk="node ${KJS_DIR}${CPK_REL_PATH} $*"
alias cpkd="dbg ${KJS_DIR}${CPK_REL_PATH}"

#fpk
export FPK_REL_PATH="/package/find/exe.js"
alias fpk="node ${KJS_DIR}${FPK_REL_PATH} $*"