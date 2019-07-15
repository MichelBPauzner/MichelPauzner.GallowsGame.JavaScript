const createGame = sprite => {

    let keyWord = '';
    let step = 1;
    let gaps = [];
    

    const createGaps = () =>  gaps = Array(keyWord.length).fill('');
        // for(var i = 0; i< keyWord.length ; i++){
        //     gaps.push('');
        // }
    
    

    const processAttempt = attempt => {

        if(!attempt.trim()){
            throw Error('Letra de chute inválida');
        }

        const exp = new RegExp(attempt, 'gi');
        let result, attemptOk = false;
        
      while(result = exp.exec(keyWord)){
          gaps[result.index] = attempt;
          attemptOk = true;

      }  

      if(!attemptOk) {
          sprite.nextFrame();
      }
      

    };

    const setKeyWord = word => {

        if(!word.trim()){
            throw Error('Palavra secreta inválida');
        }

        keyWord = word;
        createGaps();
        step = 2;
    };

    const getGaps = () => gaps;

    const getStep = () => step;


    const won = () => 
        gaps.length ?
            !gaps.some(function(gap){
            return gap == '';
        })
        : false;
    

    const lost = () => sprite.isFinished();

    const wonOrLost = () =>  lost() || won();

    const restart = () => {
        keyWord = '';
        step = 1;
        gaps = [];
        sprite.resetFrame();

    };


    return {
        setKeyWord,
        getGaps ,
        getStep,
        processAttempt,
        won,
        lost,
        wonOrLost,
        restart
    }




};