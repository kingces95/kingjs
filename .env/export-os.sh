# Get the Kernel Name
export OS=$(uname -s)
case "$OS" in
  Linux) OS="linux" ;;
  Darwin) OS="mac" ;;
  FreeBSD) OS="freebsd" ;;
* ) echo "Your Operating System `$OS` is not supported" ;;
esac