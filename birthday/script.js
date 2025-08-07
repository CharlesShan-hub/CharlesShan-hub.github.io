// 高德API配置
const AMAP_KEY = '7e20c85a5c7202f087558e2dd15fddb3';
const IP_LOCATION_URL = 'https://restapi.amap.com/v3/ip';
const WEATHER_URL = 'https://restapi.amap.com/v3/weather/weatherInfo';
const STATIC_MAP_URL = 'https://restapi.amap.com/v3/staticmap';

// DOM元素
const weatherResult = document.getElementById('weatherResult');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const cityName = document.getElementById('cityName');
const weatherDescription = document.getElementById('weatherDescription');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const themeToggle = document.getElementById('themeToggle');
const confettiBtn = document.getElementById('confettiBtn');
const mapContainer = document.getElementById('mapContainer');
const locationInfo = document.getElementById('locationInfo');
const dayTemperature = document.getElementById('dayTemperature');
const nightTemperature = document.getElementById('nightTemperature');

// 温度图表
let temperatureChart = null;

// 页面加载时自动获取位置和天气
document.addEventListener('DOMContentLoaded', async () => {
    // 只有当存在天气相关元素时才执行
    if (document.getElementById('weatherResult')) {
        try {
            await getLocationAndWeather();
        } catch (err) {
            const error = document.getElementById('error');
            if (error) {
                error.textContent = '获取位置失败: ' + err.message;
                error.classList.remove('hidden');
            }
        }
    }
});

// 获取位置和天气数据
async function getLocationAndWeather() {
    try {
        // 获取DOM元素
        const weatherResult = document.getElementById('weatherResult');
        const error = document.getElementById('error');
        const loading = document.getElementById('loading');
        
        // 检查元素是否存在
        if (!weatherResult || !error || !loading) return;
        
        // 显示加载状态
        weatherResult.classList.add('hidden');
        error.classList.add('hidden');
        loading.classList.remove('hidden');
        locationInfo.textContent = '正在获取您的位置...';

        // 1. IP定位获取城市信息
        const locationResponse = await fetch(`${IP_LOCATION_URL}?key=${AMAP_KEY}`);
        const locationData = await locationResponse.json();
        if (locationData.status !== '1') {
            throw new Error('无法获取位置信息');
        }
        const { city, adcode } = locationData;
        locationInfo.textContent = `当前位置: ${city}`;

        // 2. 获取天气数据
        const weatherResponse = await fetch(`${WEATHER_URL}?key=${AMAP_KEY}&city=${adcode}&extensions=all`);
        const weatherData = await weatherResponse.json();
        if (weatherData.status !== '1') {
            throw new Error('无法获取天气数据');
        }

        // 3. 获取坐标用于地图显示
        const geocodeResponse = await fetch(`https://restapi.amap.com/v3/geocode/geo?key=${AMAP_KEY}&address=${encodeURIComponent(city)}`);
        const geocodeData = await geocodeResponse.json();
        if (geocodeData.status !== '1') {
            throw new Error('无法获取位置坐标');
        }
        const { location } = geocodeData.geocodes[0];
        const [lng, lat] = location.split(',');

        // 4. 显示天气数据
        displayWeatherData(weatherData);

    } catch (err) {
        error.textContent = err.message;
        error.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
}

// 显示天气数据
function displayWeatherData(weatherData) {
    console.log(weatherData);
    // 提取当前天气数据并添加安全检查
    const forecastInfo = weatherData.forecasts && weatherData.forecasts[0];
    const forecasts = forecastInfo && forecastInfo.casts;

    // 检查必要数据是否存在
    if (!forecastInfo || !forecasts || forecasts.length === 0) {
        throw new Error('无法解析天气数据格式');
    }

    // 使用第一天的预报作为当前天气近似值
    const nowWeather = forecasts[0];

    // 更新当前天气
    cityName.textContent = forecastInfo.city;
    weatherDescription.textContent = nowWeather.dayweather;
    temperature.textContent = `${nowWeather.daytemp}°C`;
    
    // 设置天气图标
    weatherIcon.src = getWeatherIcon(nowWeather.dayweather);
    weatherIcon.alt = nowWeather.dayweather;
    
    windSpeed.textContent = `${nowWeather.daypower}级 ${nowWeather.daywind}`;
    dayTemperature.textContent = `${nowWeather.daytemp}°C`;
    nightTemperature.textContent = `${nowWeather.nighttemp}°C`;

    // 准备温度图表数据
    const labels = [];
    const temps = [];

    // 添加未来几天的最高和最低温度
    forecasts.slice(0, 4).forEach((cast, index) => {
        const day = ['今天', '明天', '后天', '大后天'][index];
        labels.push(`${day} 最高`);
        temps.push(parseInt(cast.daytemp));
        labels.push(`${day} 最低`);
        temps.push(parseInt(cast.nighttemp));
    });

    // 计算温度范围并添加边距
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const tempMargin = 5;

    // 更新或创建图表
    const ctx = document.getElementById('temperatureChart').getContext('2d');
    if (temperatureChart) {
        temperatureChart.destroy();
    }

    temperatureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '温度 (°C)',
                data: temps,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    min: minTemp - tempMargin,
                    max: maxTemp + tempMargin,
                    ticks: {
                        callback: function(value) {
                            return value + '°C';
                        }
                    }
                }
            }
        }
    });

    // 显示天气结果
    weatherResult.classList.remove('hidden');
}

// 根据天气状况获取图标
function getWeatherIcon(weather) {
    // 简化的图标映射
    weather = weather.toLowerCase();
    if (weather.includes('晴')) {
        return 'https://charlesshan.top/birthday/assets/sun.png';
        //return 'https://cdn-icons-png.flaticon.com/512/1779/1779938.png';
    } else if (weather.includes('雨')) {
        return 'https://charlesshan.top/birthday/assets/rain.png';
        //return 'https://cdn-icons-png.flaticon.com/512/1779/1779946.png';
    } else if (weather.includes('云')) {
        return 'https://charlesshan.top/birthday/assets/cloud.png';
        //return 'https://cdn-icons-png.flaticon.com/512/1779/1779935.png';
    } else if (weather.includes('雪')) {
        return 'https://charlesshan.top/birthday/assets/snow.png';
        //return 'https://cdn-icons-png.flaticon.com/512/1779/1779968.png';
    } else {
        return 'https://charlesshan.top/birthday/assets/others.png';
        //return 'https://cdn-icons-png.flaticon.com/512/1779/1779958.png';
    }
}

// 绘制温度图表
function drawTemperatureChart(data) {
    const ctx = document.getElementById('temperatureChart').getContext('2d');

    // 销毁现有图表
    if (temperatureChart) {
        temperatureChart.destroy();
    }

    // 创建新图表
    temperatureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(item => item.date),
            datasets: [{
                label: '温度 (°C)',
                data: data.map(item => item.temp),
                borderColor: '#FF6B8B',
                backgroundColor: 'rgba(255, 107, 139, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: '#FF6B8B',
                pointRadius: 5,
                pointHoverRadius: 7,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#2C3E50',
                    bodyColor: '#2C3E50',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1,
                    padding: 10,
                    boxPadding: 5,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} °C`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// 主题切换
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    const cards = document.querySelectorAll('.bg-white, .bg-gray-50, .bg-gray-800, .bg-gray-700');
    const textElements = document.querySelectorAll('.text-dark, .text-gray-600, .text-gray-700, .text-gray-500, .text-white, .text-gray-200, .text-gray-300');
    const weatherResult = document.getElementById('weatherResult');
    const errorElement = document.getElementById('error');
    const loadingElement = document.getElementById('loading');
    const dayTempCard = document.getElementById('dayTempCard');
    const nightTempCard = document.getElementById('nightTempCard');

    if (document.body.classList.contains('dark-mode')) {
        // 切换到暗黑模式
        icon.classList.remove('fa-moon-o');
        icon.classList.add('fa-sun-o');
        document.body.classList.remove('from-light', 'to-blue-50');
        document.body.classList.add('from-dark', 'to-gray-800');

        // 更新卡片颜色
        cards.forEach(card => {
            card.classList.remove('bg-white', 'bg-gray-50');
            card.classList.add('bg-gray-800', 'bg-gray-700');
        });

        // 更新文字颜色
        textElements.forEach(text => {
            text.classList.remove('text-dark', 'text-gray-600', 'text-gray-700', 'text-gray-500');
            text.classList.add('text-white', 'text-gray-200', 'text-gray-300');
        });

        // 更新特殊元素
        if (weatherResult) weatherResult.classList.add('text-white');
        if (errorElement) {
            errorElement.classList.remove('bg-red-50', 'border-red-100', 'text-red-600');
            errorElement.classList.add('bg-red-900', 'border-red-800', 'text-red-200');
        }
        if (loadingElement) {
            loadingElement.classList.add('bg-gray-800');
            loadingElement.querySelector('p').classList.remove('text-gray-600');
            loadingElement.querySelector('p').classList.add('text-gray-300');
        }
        // 更新header背景
        const header = document.querySelector('header');
        header.classList.remove('bg-white/80');
        header.classList.add('bg-gray-900/80');
        
        // 更新header文字颜色
        const headerTitle = header.querySelector('h1');
        headerTitle.classList.remove('text-primary');
        headerTitle.classList.add('text-white');
        
        // 更新主题切换按钮
        themeToggle.classList.remove('bg-white');
        themeToggle.classList.add('bg-gray-700');
        icon.classList.remove('text-dark');
        icon.classList.add('text-white');

        // 更新温度卡片
        if (dayTempCard) {
            dayTempCard.classList.remove('bg-blue-50');
            dayTempCard.classList.add('bg-blue-900');
            dayTempCard.querySelector('p.text-sm').classList.remove('text-gray-500');
            dayTempCard.querySelector('p.text-sm').classList.add('text-gray-300');
            dayTempCard.querySelector('p#dayTemperature').classList.remove('text-dark');
            dayTempCard.querySelector('p#dayTemperature').classList.add('text-white');
        }
        if (nightTempCard) {
            nightTempCard.classList.remove('bg-indigo-50');
            nightTempCard.classList.add('bg-indigo-900');
            nightTempCard.querySelector('p.text-sm').classList.remove('text-gray-500');
            nightTempCard.querySelector('p.text-sm').classList.add('text-gray-300');
            nightTempCard.querySelector('p#nightTemperature').classList.remove('text-dark');
            nightTempCard.querySelector('p#nightTemperature').classList.add('text-white');
        }

    } else {
        // 切换到亮色模式
        icon.classList.remove('fa-sun-o');
        icon.classList.add('fa-moon-o');
        document.body.classList.remove('from-dark', 'to-gray-800');
        document.body.classList.add('from-light', 'to-blue-50');

        // 更新卡片颜色
        cards.forEach(card => {
            card.classList.remove('bg-gray-800', 'bg-gray-700', 'bg-blue-900', 'bg-indigo-900');
            card.classList.add('bg-white', 'bg-gray-50', 'bg-blue-50', 'bg-indigo-50');
        });

        // 更新文字颜色
        textElements.forEach(text => {
            text.classList.remove('text-white', 'text-gray-200', 'text-gray-300', 'dark:text-gray-300', 'dark:text-white');
            text.classList.add('text-dark', 'text-gray-600', 'text-gray-700', 'text-gray-500');
        });

        // 更新特殊元素
        if (weatherResult) weatherResult.classList.remove('text-white');
        if (errorElement) {
            errorElement.classList.remove('bg-red-900', 'border-red-800', 'text-red-200');
            errorElement.classList.add('bg-red-50', 'border-red-100', 'text-red-600');
        }
        if (loadingElement) {
            loadingElement.classList.remove('bg-gray-800');
            loadingElement.querySelector('p').classList.remove('text-gray-300');
            loadingElement.querySelector('p').classList.add('text-gray-600');
        }

        // 更新header背景
        const header = document.querySelector('header');
        header.classList.remove('bg-gray-900/80');
        header.classList.add('bg-white/80');
        
        // 更新header文字颜色
        const headerTitle = header.querySelector('h1');
        headerTitle.classList.remove('text-white');
        headerTitle.classList.add('text-primary');
        
        // 更新主题切换按钮
        themeToggle.classList.remove('bg-gray-700');
        themeToggle.classList.add('bg-white');
        icon.classList.remove('text-white');
        icon.classList.add('text-dark');

        // 恢复温度卡片
        if (dayTempCard) {
            dayTempCard.classList.remove('bg-blue-900');
            dayTempCard.classList.add('bg-blue-50');
            dayTempCard.querySelector('p.text-sm').classList.remove('text-gray-300');
            dayTempCard.querySelector('p.text-sm').classList.add('text-gray-500');
            dayTempCard.querySelector('p#dayTemperature').classList.remove('text-white');
            dayTempCard.querySelector('p#dayTemperature').classList.add('text-dark');
        }
        if (nightTempCard) {
            nightTempCard.classList.remove('bg-indigo-900');
            nightTempCard.classList.add('bg-indigo-50');
            nightTempCard.querySelector('p.text-sm').classList.remove('text-gray-300');
            nightTempCard.querySelector('p.text-sm').classList.add('text-gray-500');
            nightTempCard.querySelector('p#nightTemperature').classList.remove('text-white');
            nightTempCard.querySelector('p#nightTemperature').classList.add('text-dark');
        }
    }
});

// 撒花效果函数
function createConfetti() {
    const colors = ['#FF6B8B', '#4A90E2', '#FFD166', '#06D6A0', '#118AB2', '#073B4C'];
    const confettiCount = 100;
    const container = document.body;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'fixed';
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.position = 'fixed';
        confetti.style.top = '-20px';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.opacity = Math.random() * 0.5 + 0.5;
        confetti.style.animation = `falling ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.zIndex = '1000';
        container.appendChild(confetti);

        // 动画结束后移除元素
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// 撒花按钮事件
confettiBtn.addEventListener('click', () => {
    createConfetti();
    // 简单的撒花效果
    const colors = ['#FF6B8B', '#4A90E2', '#FFD166', '#06D6A0', '#118AB2', '#073B4C'];
    const confettiCount = 100;
    const container = document.body;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'fixed';
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.position = 'fixed';
        confetti.style.top = '-20px';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.opacity = Math.random() * 0.5 + 0.5;
        confetti.style.animation = `falling ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.zIndex = '1000';
        container.appendChild(confetti);

        // 动画结束后移除元素
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
});

// 拆包裹动画和轮播图功能
const giftCard = document.getElementById('giftCard');
const unboxAnimation = document.getElementById('unboxAnimation');
const giftBox = document.getElementById('giftBox');
const lid = document.getElementById('lid');
const contentContainer = document.getElementById('contentContainer');
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
const totalSlides = 3;

// 点击礼物卡片触发拆包裹动画
if (giftCard) {
    giftCard.addEventListener('click', () => {
        unboxAnimation.classList.remove('hidden');
        
        // 盒子初始动画 - 轻微缩放
        giftBox.style.transition = 'transform 0.5s ease-in-out';
        giftBox.style.transform = 'scale(1.05)';
        
        // 盖子打开动画 - 更长更自然
        setTimeout(() => {
            lid.style.transition = 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
            lid.style.transform = 'translateY(-70px) rotate(15deg)';
        }, 800);
        
        // 盒子轻微旋转
        setTimeout(() => {
            giftBox.style.transition = 'transform 1s ease-in-out';
            giftBox.style.transform = 'scale(1.05) rotate(5deg)';
        }, 1200);
        
        // 盒子弹跳后消失，显示内容 - 延长时间
        setTimeout(() => {
            giftBox.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            giftBox.style.opacity = '0';
            giftBox.style.transform = 'translateY(50px) scale(0.8)';
            
            setTimeout(() => {
                unboxAnimation.classList.add('hidden');
                contentContainer.classList.remove('hidden');
                // 隐藏生日祝福卡片
                giftCard.classList.add('hidden');
                
                // 触发第一次撒花效果
                setTimeout(() => createConfetti(), 300);
                // 触发第二次撒花效果
                setTimeout(() => createConfetti(), 1500);
            }, 1000);
        }, 2500);
    });
}

// 轮播图控制
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });
}

function updateCarousel() {
    if (carousel) {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

// 导入CSS动画
const style = document.createElement('link');
style.rel = 'stylesheet';
style.href = 'styles.css';
document.head.appendChild(style);