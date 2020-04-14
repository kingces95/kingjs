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