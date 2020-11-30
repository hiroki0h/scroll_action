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
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: $('#scene-0'),
                messageA: $('#scene-0 .main-message.message-a'),
                messageB: $('#scene-0 .main-message.message-b'),
                messageC: $('#scene-0 .main-message.message-c')
            },
            values: {
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.35 }],
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
        
        // 모션 시작 끝 구간
        const partScrollStart = values[2].start * scrollHeight;
        const partScrollEnd = values[2].end * scrollHeight;
        // 모션 높이
        const partScrollHeight = partScrollEnd - partScrollStart;
        
        
        // 씬 처음과 끝을 비율로 만들기
        // 내가 보고 있는 구간 
        console.log('values',values);
        console.log('currentYOffset',currentYOffset);
        
        returnValue = 
        
    };
    
    // 3    
    const playAnimation = () => {
        
        const objs = sceneInfo[currentScene].objs;  
        const values = sceneInfo[currentScene].values;  
        
        // 현재 씬에서의 스크롤 높이
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight; // 현재 씬에서 스크롤 높이만큼의 비율
        
        
//        console.log('currentYOffset',currentYOffset);
//        console.log('prevScrollHeight',prevScrollHeight);
        
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