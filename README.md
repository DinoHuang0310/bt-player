# btnet audio player
 
 ### Follow the rules when you git
  1. feat: 新功能 (feature)
  2. fix: 修補bug
  3. doc: 文件 (documentation)
  4. style: 樣式 (不影響程式碼運行之異動)
  5. refactor: 重構 (未新增功能或修補bug之程式碼異動)
  6. test: 增加測試
  7. chore: 構建過程或輔助工具之異動


## usage

### html
```sh
<script src="//code.jquery.com/jquery-3.6.4.js"></script>
<script src="/bt-player.js"></script>

<div id="my-player" style="width: 420px; max-width: 100%;"></div>
```

### script
```sh
new BtPlayer({
  container: $('#my-player'),
  src: 'assets/preview.mp3',
  onGTMStart: () => {
    console.log('start')
  },
  onGTM25: () => {
    console.log('25%')
  },
  onGTM50: () => {
    console.log('50%')
  },
  onGTM75: () => {
    console.log('75%')
  },
  onGTMEnd: () => {
    console.log('end')
  }
});
```