if [[ $1 == "" ]]
  then
    echo Please pass path to nvm directory.
    exit 1
fi

export NVM_DIR=$1

NVM_EXT_DIR=~/.nvm
if [[ -d $NVM_EXT_DIR/.cache && ! -d $NVM_DIR/.cache ]] 
  then
    export NVM_EXT_DIR
    echo linking \$NVM_DIR/.cache -> \$NVM_EXT_DIR/.cache
    ln -s $NVM_EXT_DIR/.cache $NVM_DIR/.cache
fi

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion