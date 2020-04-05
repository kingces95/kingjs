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
export KJS_NODE_VERSION=v12.16.1 

# Export known directories
export KJS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
export KJS_ENV_DIR="$KJS_DIR/.env"
export KJS_OS_DIR="$KJS_ENV_DIR/$OS"
export KJS_ARCH_DIR="$KJS_OS_DIR/$PLATFORM"
export KJS_NVM_DIR="$KJS_ARCH_DIR/nvm"
export KJS_NODE_DIR="$KJS_NVM_DIR/versions/node/$KJS_NODE_VERSION/bin"

# Export known files
export KJS_PROFILE="$KJS_DIR/.profile"

# Define prompt
export PS1='\e[0;32m$(pwd)/$ \e[m'

# Define functions
pd() { pushd $1 > /dev/null; }
pod() { popd > /dev/null; }

# Define aliases
alias e="env | sort"
alias re=". $KJS_PROFILE"
alias pd="pd"
alias kjs="pd $KJS_DIR"
alias cdos="pd $KJS_OS_DIR"
alias cdnvm="pd $KJS_NVM_DIR"
alias cdarch="pd $KJS_ARCH_DIR"
alias cdnode="pd $KJS_NODE_DIR"
alias p="pod"
alias pp="pod && p"
alias ppp="pod && pp"
alias pppp="pod && ppp"
alias .="cd .."

# Strip path
export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:$KJS_NODE_DIR

# Load NVM
export NVM_DIR=$KJS_NVM_DIR
[ -s "$KJS_NVM_DIR/nvm.sh" ] && \. "$KJS_NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$KJS_NVM_DIR/bash_completion" ] && \. "$KJS_NVM_DIR/bash_completion"  # This loads nvm bash_completion