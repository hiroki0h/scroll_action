import $ from 'jquery';

(($) => {
//(function(){
    let yOffset = 0; // 현재 스크롤 높이 저장
    let currentScene = 0; // 현재 활성화 된 씬
    let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 있는 섹션들 높이 합
    let sceneChange = false; // 씬이 변경될 때 활성화
    
    const sceneInfo = [
        {
            type: 'sticky',
            heightNum: 3,
            scrollHeight: 0,
            objs: {
                container: $('#scene-0'),
                messageA: $('#scene-0 .main-message.message-a'),
                messageB: $('#scene-0 .main-message.message-b'),
            },
            values: {
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.35 }],
                messageA_translateX_in: [-10, 0, { start: 0.1, end: 0.2 }],
                messageA_translateX_out: [0, 10, { start: 0.25, end: 0.35 }],

                messageB_opacity_in: [0, 1, { start: 0.4, end: 0.5 }],
                messageB_opacity_out: [1, 0, { start: 0.55, end: 0.65 }],
                messageB_translateY_in: [-15, 0, { start: 0.4, end: 0.5 }],
                messageB_translateY_out: [0, 15, { start: 0.55, end: 0.65 }],
            }
        }
    ];
    
    // 2
    const setLayout = () => {
        sceneInfo[0].scrollHeight = sceneInfo[0].heightNum * window.innerHeight;
        
        sceneInfo[0].objs.container.css({
            'height': sceneInfo[0].scrollHeight  
        });
        
        // 현재 스크롤높이
        yOffset = window.pageYOffset;
        console.log('yOffset',yOffset);
    };
    
    // 4
    const calcValues = (values, currentYOffset) => {  
        let returnValue;  
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        
        // 모션 시작 offset
        const partScrollStart = values[2].start * scrollHeight;
        // 모션 끝 offset
        const partScrollEnd = values[2].end * scrollHeight;
        // 모션 높이
        const partScrollHeight = partScrollEnd - partScrollStart;

        if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
            // 모션영역 시작과 끝 사이에서 do something
            // 영역 들어갔을때 내가 있는 곳에서의 비율
            //  messageA_opacity_in - 내 offset은 300 - 시작은 290.7 -> 9.3 / 290.7 * ( 1 - 0 )        +    0
            returnValue = ( currentYOffset - partScrollStart ) / partScrollHeight * ( values[1] - values[0] ) + values[0];
            //              0.0319917...

        }else if(currentYOffset < partScrollStart){
            // 시작 전
            returnValue = values[0];
        }else if(currentYOffset > partScrollEnd){
            // 끝나고 난 뒤
            returnValue = values[1];
        }
        return returnValue;

    };
    
    // 3    
    const playAnimation = () => {
        
        const objs = sceneInfo[currentScene].objs;  
        const values = sceneInfo[currentScene].values;  
        
        // 현재 씬에서의 스크롤 높이
        // yOffset - 현재 스크롤 높이 저장
        const currentYOffset = yOffset - prevScrollHeight;

        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight; // 현재 씬에서 스크롤 높이만큼의 비율
        if( scrollRatio <= 0.22 ){ // 모션 들어갔다
            objs.messageA.css({
                'opacity': calcValues(values.messageA_opacity_in, currentYOffset),
                'transform': `translate3d(${calcValues(values.messageA_translateX_in, currentYOffset)}%, -50%, 0)`
            });
        }else{
            objs.messageA.css({ // 모션 나오기
                'opacity': calcValues(values.messageA_opacity_out, currentYOffset),
                'transform': `translate3d(${calcValues(values.messageA_translateX_out, currentYOffset)}%, -50%, 0)`
            });
        }
        if( scrollRatio <= 0.52 ){
            objs.messageB.css({
                'opacity': calcValues(values.messageB_opacity_in, currentYOffset),
                'transform': `translate3d(0, ${-50 + calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`
            });
        }else{
            objs.messageB.css({
                'opacity': calcValues(values.messageB_opacity_out, currentYOffset),
                'transform': `translate3d(0, ${-50 + calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`
            });
        }
    };
        
    const scrollLoop = () => {
        playAnimation();
    };
        
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    
    window.addEventListener('load', () => {
        setLayout();
//        console.log(sceneInfo[0]);
    });
    
    window.addEventListener('resize', setLayout);
    
    
//}());
})($);