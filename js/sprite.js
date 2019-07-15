const createSprite = selector => {

        const moveFrame = (from, to) => {
            $el.removeClass(frames[from])
               .addClass(frames[to]);
        };

        const hasNextFrame = () => current + 1 <= last;

        const nextFrame = () => {
            if(hasNextFrame()) {
                moveFrame(current, ++current);
            }
        };

        const resetFrame = () => {
            moveFrame(current,0);
            current = 0;
        };

        const isFinished = () => !hasNextFrame();

        const $el = $(selector); 

        const frames = [
            'frame1','frame2','frame3','frame4',
            'frame5','frame6','frame7','frame8','frame9'
        ];

        let current = 0;
        let last = frames.length - 1;
        $el.addClass(frames[current]);

        return {
            nextFrame,
            resetFrame,
            isFinished
        };

};

    
