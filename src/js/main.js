import $ from 'jquery';

(($) => {
//(function(){
    let yOffset = 0; // 현재 스크롤 높이 저장
    let currentScene = 0; // 현재 활성화 된 씬
    
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
                messageB_opacity_in: [0, 1, { start: 0.4, end: 0.5 }],
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
        console.log(yOffset);
    };
    
    // 4
    const calcValues = () => {        
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        // 씬 처음과 끝을 비율로 만들기
        // 내가 보고 있는 구간 
        
    };
    
    // 3    
    const playAnimation = () => {
    };
    
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
    });
    
    window.addEventListener('load', () => {
        setLayout();
        
        playAnimation();
//        console.log(sceneInfo[0]);
    });
    
    window.addEventListener('resize', setLayout);
    
    
//}());
})($);