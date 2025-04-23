document.addEventListener('DOMContentLoaded', function() {
    const yearSelect = document.getElementById('year');
    const calculateBtn = document.getElementById('calculate');
    const resultContainer = document.getElementById('result');

    // 現在の年を取得
    const currentYear = new Date().getFullYear();
    
    // 過去100年分の選択肢を生成
    for (let year = currentYear; year >= currentYear - 100; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = `${year}年 (${getJapaneseEra(year)})`;
        yearSelect.appendChild(option);
    }

    // 計算ボタンのクリックイベント
    calculateBtn.addEventListener('click', function() {
        const selectedYear = parseInt(yearSelect.value);
        if (isNaN(selectedYear)) {
            alert('年を選択してください');
            return;
        }

        const memorialYears = calculateMemorialYears(selectedYear);
        displayResults(memorialYears);
    });

    // 年忌計算関数
    function calculateMemorialYears(baseYear) {
        return {
            '一周忌': baseYear + 1,
            '三回忌': baseYear + 2,
            '七回忌': baseYear + 6,
            '十三回忌': baseYear + 12,
            '十七回忌': baseYear + 16,
            '二十三回忌': baseYear + 22,
            '二十五回忌': baseYear + 24,
            '二十七回忌': baseYear + 26,
            '三十三回忌': baseYear + 32,
            '三十七回忌': baseYear + 36,
            '五十回忌': baseYear + 49
        };
    }

    // 結果表示関数
    function displayResults(years) {
        resultContainer.innerHTML = '';
        
        // 年忌の結果を表示
        for (const [memorial, year] of Object.entries(years)) {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.textContent = `${memorial}: ${year}年`;
            resultContainer.appendChild(resultItem);
        }

        // 注意書きを表示（最後に追加）
        const note = document.createElement('div');
        note.className = 'note';
        note.textContent = '※地方によっては二十五回忌を勤める場合があります。';
        resultContainer.appendChild(note);
    }

    // 和暦変換関数
    function getJapaneseEra(year) {
        if (year >= 2019) return `令和${year - 2018}年`;
        if (year >= 1989) return `平成${year - 1988}年`;
        if (year >= 1926) return `昭和${year - 1925}年`;
        if (year >= 1912) return `大正${year - 1911}年`;
        return `明治${year - 1867}年`;
    }
}); 
