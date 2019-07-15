const createController = game => {

    const $input = $('.entry');
    const $gaps = $('.gaps');

    const showGaps = () => {
        $gaps.empty();
        game.getGaps().forEach((g)=> {
            $('<li>')
                .addClass('gap')
                .append(g)
                .appendTo($gaps);
        });
    };

    const changePlaceHolder = text => 
        $input
            .val('')
            .attr('placeholder', text);


    const saveKeyWord = () => {

        try {
            game.setKeyWord($input.val().trim());
            $input.val('');
            showGaps();
            changePlaceHolder('Digite uma letra para tentar...');
            
        } catch (err) {
            alert(err.message);
        }

    };

    const restart = () =>{

        game.restart();
        $gaps.empty();
        changePlaceHolder('Palavra secreta');
    }

    const process = () => {

        try {
            var attempt = $input.val().trim().substr(0,1);
            game.processAttempt(attempt);
            $input.val('');
            showGaps();
    
            if(game.wonOrLost()){
    
                setTimeout(() => {
                    if(game.won()){
                        alert('Parabéns você ganhou!');
        
                    } else {
                        alert('Que pena, você perdeu!');
        
                    }
    
                    restart();
                }, 200);
            }
            
        } catch (err) {
            alert(err.message);
        }
    };

    const start = () => {

        $input.keypress( event => {
            if (event.which == 13) {
                switch (game.getStep()) {
                    case 1:
                        saveKeyWord();
                        break;
                    case 2:
                        process();
                        break;
                }
            }
        });
    };

    // retorna um objeto com a propriedade inicia, que deve ser chamada assim que o controller for criado. 
    return { start };

};