class BtPlayer {

  constructor(options) {
    const { container, src, showIcon = true, } = options;

    this.audio = document.createElement('audio');
    this.audio.setAttribute('src', src);

    // play button
    this.$playBtn = $(`<span class="player-button"></span>`);
    this.$playIcon = $(`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 23" xml:space="preserve">
    <path d="M0,11.5C0,5.1,5.1,0,11.5,0S23,5.1,23,11.5S17.9,23,11.5,23S0,17.9,0,11.5z M8.5,6.6C8.1,6.8,7.9,7.2,7.9,7.5v7.9
      c0,0.4,0.2,0.8,0.6,0.9c0.3,0.2,0.8,0.2,1.1,0l6.5-4c0.3-0.2,0.5-0.5,0.5-0.9c0-0.4-0.2-0.7-0.5-0.9l-6.5-4C9.2,6.4,8.8,6.4,8.5,6.6 L8.5,6.6z"/>
    </svg>`).appendTo(this.$playBtn);
    this.$pauseIcon = $(`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 23" xml:space="preserve">
    <path d="M11.5,23C17.9,23,23,17.9,23,11.5S17.9,0,11.5,0S0,5.1,0,11.5S5.1,23,11.5,23z M10.1,8.6v5.8c0,0.8-0.6,1.4-1.4,1.4
      s-1.4-0.6-1.4-1.4V8.6c0-0.8,0.6-1.4,1.4-1.4S10.1,7.8,10.1,8.6z M15.8,8.6v5.8c0,0.8-0.6,1.4-1.4,1.4s-1.4-0.6-1.4-1.4V8.6 c0-0.8,0.6-1.4,1.4-1.4S15.8,7.8,15.8,8.6z"/>
    </svg>`);

    // timeline bar
    this.$timelineBar = $(`<div class="timeline-bar"><div></div></div>`);

    // audio time
    this.$currentTime = $('<span class="audio-time">00:00</span>');
    this.$duration = $('<span class="audio-time">/00:00</span>');

    // speed controller
    this.$speedController = $('<span class="player-button player-speed">x1</span>');

    // volume button
    this.$volumeBtn = $(`<span class="player-button volume-button">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 21.2 20" xml:space="preserve">
    <path d="M18.5,4c1.7,1.4,2.8,3.5,2.8,5.8s-1.1,4.4-2.8,5.8c-0.4,0.3-1,0.3-1.3-0.1c-0.3-0.4-0.3-1,0.1-1.3c1.3-1,2.1-2.6,2.1-4.4
      s-0.8-3.3-2.1-4.4c-0.4-0.3-0.5-0.9-0.1-1.3C17.5,3.7,18.1,3.7,18.5,4L18.5,4z M16.1,6.9c0.8,0.7,1.4,1.7,1.4,2.9S17,12,16.1,12.7
      c-0.4,0.3-1,0.3-1.3-0.1s-0.3-1,0.1-1.3c0.4-0.3,0.7-0.9,0.7-1.5s-0.3-1.1-0.7-1.5C14.5,8,14.5,7.4,14.8,7S15.7,6.6,16.1,6.9
      L16.1,6.9z M11.8,1.2c0.4,0.2,0.7,0.6,0.7,1.1v15c0,0.5-0.3,0.9-0.7,1.1c-0.4,0.2-1,0.1-1.3-0.2l-5.3-4.7H2.5
      c-1.4,0-2.5-1.1-2.5-2.5V8.6c0-1.4,1.1-2.5,2.5-2.5h2.6l5.3-4.7C10.8,1,11.3,1,11.8,1.2z"/>
    </svg>
    </span>`);

    // volume controller container
    this.$volumeController = $('<div class="volume-controlle-wrapper"></div>');

    // volume bar
    this.$volumeBar = $(`<div class="volume-bar"><div></div></div>`);
    this.$volumeController.append(this.$volumeBar);

    // init player model
    container.append(
      showIcon ? `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" xml:space="preserve">
      <path d="M5.33,19.26l-1.27,0.08c-0.48,0.03-0.9-0.34-0.93-0.82l-0.46-7.02c-0.03-0.48,0.34-0.9,0.82-0.93l1.27-0.08 c0.93-0.06,1.73,0.65,1.79,1.57l0.35,5.4C6.96,18.39,6.25,19.2,5.33,19.26z"/>
      <path d="M1.48,17.93l-0.54,0.04c-0.33,0.02-0.63-0.23-0.65-0.57L0,12.92c-0.02-0.33,0.23-0.63,0.57-0.65l0.54-0.04 c0.33-0.02,0.63,0.23,0.65,0.57l0.29,4.48C2.07,17.62,1.82,17.91,1.48,17.93z"/>
      <path d="M14.67,19.26l1.27,0.08c0.48,0.03,0.9-0.34,0.93-0.82l0.46-7.02c0.03-0.48-0.34-0.9-0.82-0.93l-1.27-0.08 c-0.93-0.06-1.73,0.65-1.79,1.57l-0.35,5.4C13.04,18.39,13.75,19.2,14.67,19.26z"/>
      <path d="M18.52,17.93l0.54,0.04c0.33,0.02,0.63-0.23,0.65-0.57L20,12.92c0.02-0.33-0.23-0.63-0.57-0.65l-0.54-0.04 c-0.33-0.02-0.63,0.23-0.65,0.57l-0.29,4.48C17.93,17.62,18.18,17.91,18.52,17.93z"/>
      <path d="M18.3,7.8c0.29-0.21,0.42-0.6,0.3-0.96c-0.64-1.9-1.72-3.54-3.11-4.74C13.89,0.73,11.99,0,10,0
        C8.06,0,6.2,0.69,4.62,2.01C3.17,3.23,2.05,4.9,1.39,6.84C1.27,7.21,1.41,7.59,1.7,7.8c-0.25,0.95-0.38,1.97-0.38,3.01
        c0,0.16,0.13,0.28,0.28,0.28s0.28-0.13,0.28-0.28c0-0.99,0.13-1.95,0.36-2.85C2.59,7.95,2.9,7.73,3.01,7.39
        C3.57,5.74,4.5,4.33,5.72,3.32C6.98,2.27,8.46,1.71,10,1.71c1.58,0,3.09,0.58,4.37,1.69c1.16,1,2.07,2.38,2.61,3.99
        c0.12,0.34,0.43,0.56,0.77,0.57c0.23,0.9,0.36,1.86,0.36,2.85c0,0.16,0.13,0.28,0.28,0.28s0.28-0.13,0.28-0.28
        C18.68,9.77,18.55,8.75,18.3,7.8z"/>
      </svg>` : '',
      $('<div class="bt-mp3-player"></div>').append([
        this.$playBtn,
        this.$currentTime,
        this.$duration,
        this.$timelineBar,
        this.$speedController,
        this.$volumeBtn,
        this.$volumeController,
      ])
    ).wrapInner('<div class="bt-mp3-container disabled"></div>');

    if (!$('#bt-player-styles').length) {
      $(`<style id="bt-player-styles" type='text/css'>
        .bt-mp3-container {
          display: flex;
          align-items: center;
        }
        .bt-mp3-container svg {
          width: 25px;
          fill: #555555;
        }
        .bt-mp3-container > svg {
          margin-right: 8px;
        }
        .bt-mp3-container.disabled {
          opacity: 0.6;
        }
        .bt-mp3-container.disabled * {
          cursor: auto !important; 
        }
        .bt-mp3-player {
          overflow: hidden;
          position: relative;
          display: flex;
          flex: 1;
          align-items: center;
          background-color: #eee;
          border-radius: 25px;
          color: #555555;
        }
        .bt-mp3-player .player-button {
          cursor: pointer;
          display: flex;
          justify-content: center;
          padding: 0 8px;
          margin: 10px 0;
        }
        .bt-mp3-player .player-button:first-child {
          padding-left: 13px;
        }
        .bt-mp3-player .player-button.volume-button {
          padding: 0 15px 0 0;
        }
        .player-button.volume-button svg {
          width: 20px;
        }
        .bt-mp3-player .player-button:last-child {
          margin-right: 0;
        }
        .bt-mp3-player .player-speed {
          border-left: solid 1px #555555;
          width: 46px;
          overflow: hidden;
          font-weight: 100;
        }
        .bt-mp3-player .audio-time {
          font-weight: 100;
        }
        .bt-mp3-player .timeline-bar {
          position: relative;
          flex: 1;
          padding: 8px 0;
          margin: 0 15px;
          cursor: pointer;
        }
        .bt-mp3-player .timeline-bar::before {
          content: '';
          position: absolute;
          width: 100%;
          background-color: #a3a3a3;
          height: 3px;
        }
        .bt-mp3-player .timeline-bar div {
          position: relative;
          width: 0;
          height: 3px;
          background-color: #e52020;
        }
        .bt-mp3-player .timeline-bar div::after,
        .bt-mp3-player .volume-bar div::after {
          content: '';
          display: block;
          position: absolute;
          background-color: #e52020;
          border: solid 1px white;
          border-radius: 50%;
          box-shadow: 0 0 3px rgba(0, 0, 0, .4);
          cursor: pointer;
          width: 15px;
          height: 15px;
          top: 50%;
          right: 0;
          transform: translate(50%, -50%);
        }
        .bt-mp3-player .volume-controlle-wrapper {
          position: absolute;
          display: none;
          top: 50%;
          right: 45px;
          width: 100px;
          background-color: white;
          border: solid 1px #ccc;
          transform: translate(0, -50%);
        }
        .bt-mp3-player .volume-bar {
          position: relative;
          width: 75%;
          margin: 8px auto;
          padding: 8px 0;
          cursor: pointer;
        }
        .bt-mp3-player .volume-bar::before {
          content: '';
          position: absolute;
          height: 3px;
          width: 100%;
          background-color: #a3a3a3;
        }
        .bt-mp3-player .volume-bar div {
          position: relative;
          height: 3px;
          background-color: #e52020;
        }
        @media (max-width: 481px) {
          .bt-mp3-player .volume-button {
            display: none;
          }
          .bt-mp3-player .player-speed {
            padding-right: 15px;
          }
        }
      </style>`).appendTo("head");
    }

    this.totalTime;
    this.stepTime;

    this.speed = [1, 1.5, 2, 0.5];
    this.activeSpeed = 0;

    this.slidable = false;
    this.volumeSlidable = false;
    this.showVolumeController = false;
    
    this.init(options);
  }

  init(options) {
    const { audio } = this;
    let {
      container,
      onGTMStart,
      onGTM25,
      onGTM50,
      onGTM75,
      onGTMEnd,
    } = options;

    const callGTM = (percentage) => {
      if (onGTMStart && percentage > 0) {
        onGTMStart();
        onGTMStart = null;
      }
      if (onGTM25 && percentage >= 25) {
        onGTM25();
        onGTM25 = null;
      }
      if (onGTM50 && percentage >= 50) {
        onGTM50();
        onGTM50 = null;
      }
      if (onGTM75 && percentage >= 75) {
        onGTM75();
        onGTM75 = null;
      }
      if (onGTMEnd && percentage == 100) {
        onGTMEnd();
        onGTMEnd = null;
      }
    }

    // bind audio event listener
    $(audio).on({
      loadedmetadata: () => {
        if (!audio.canPlayType('audio/mpeg')) return;
        
        this.totalTime = audio.duration;
        this.$duration.text(`/${this.timeFormatter(audio.duration)}`);
        this.bindControllerEvents();
        container.children().removeClass('disabled');
      },
      timeupdate: ({ target }) => {
        const currentPercentage = target.currentTime / this.totalTime * 100;
        
        if (!this.slidable) this.setTimelineView(currentPercentage);

        // callback ga event once
        if (audio.paused && currentPercentage < 100) return;
        callGTM(currentPercentage);

      },
      ratechange: ({ target }) => {
        this.activeSpeed = this.speed.indexOf(target.playbackRate);
        this.$speedController.text(`x${target.playbackRate}`);
      },
      volumechange: ({ target }) => {
        this.$volumeBar.children('div').css('width', `${this.$volumeBar.width() * target.volume}px`);
      },
      pause: () => {
        this.$playBtn.html(this.$playIcon);
      },
      play: () => {
        this.$playBtn.html(this.$pauseIcon);
      },
    })
    
  }

  bindControllerEvents() {
    const { audio } = this;

    this.$playBtn.on('click', () => (audio.paused ? audio.play() : audio.pause()));

    this.$speedController.on('click', () => (this.nextSpeed()));

    const closeVolumeController = () => {
      this.showVolumeController = false;
      this.$volumeController.css('display', 'none');
      
      $(document).off('click', closeVolumeController);
    }

    this.$volumeBtn.on('click', (e) => {
      if (this.showVolumeController) {
        closeVolumeController();
      } else {
        this.showVolumeController = true;
        this.$volumeController.css('display', 'block');
        $(document).on('click', closeVolumeController);
      }

      e.stopPropagation();
    })

    // bind timeline bar drag event
    const timelineDragging = (position) => {
      const offsetX = this.getInnerPosition({
        position,
        offset: this.$timelineBar.offset().left,
        max: this.$timelineBar.width()
      });

      this.setTimelineView(offsetX / this.$timelineBar.width() * 100);
    }

    this.bindDragEvent({
      target: this.$timelineBar,
      onMousedown: ({ x }) => {
        timelineDragging(x);
        this.slidable = true;
      },
      onMousemove: ({ x }) => {
        if (this.slidable) {
          timelineDragging(x);
        }
      },
      onMouseup: () => {
        if (this.slidable) {
          audio.currentTime = this.stepTime;
        }
        this.slidable = false;
      },
      onTouchstart: ({ x }) => {
        timelineDragging(x);
        this.slidable = true;
      },
      onTouchmove: ({ x }) => timelineDragging(x),
      onTouchend: () => {
        audio.currentTime = this.stepTime;
        this.slidable = false;
      }
    })

    // bind volume bar drag event
    const volumeDragging = (position) => {
      const offsetX = this.getInnerPosition({
        position,
        offset: this.$volumeBar.offset().left,
        max: this.$volumeBar.width()
      });
      this.audio.volume = offsetX / this.$volumeBar.width();
    }

    this.bindDragEvent({
      target: this.$volumeBar,
      onClick: (e) => e.stopPropagation(),
      onMousedown: ({ x }) => {
        volumeDragging(x);
        this.volumeSlidable = true;
      },
      onMousemove: ({ x }) => {
        if (this.volumeSlidable) {
          volumeDragging(x);
        }
      },
      onMouseup: () => this.volumeSlidable = false,
    });

  }

  timeFormatter(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    return `${hours ? hours + ':' : ''}${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
  }

  nextSpeed() {
    const { speed } = this;
    
    const next = (speed.length + (this.activeSpeed + 1)) % speed.length;
    this.audio.playbackRate = speed[next];
  }
  
  setTimelineView(percentage) {
    const seconds = percentage / 100 * this.totalTime;
    this.stepTime = seconds;
    this.$currentTime.text(this.timeFormatter(seconds));

    this.$timelineBar.children('div').css('width', `${percentage}%`);
  }

  getInnerPosition({ position, offset = 0, max }) {
    const computed = position - offset;
    return computed <= 0 ? 0 : computed >= max ? max : computed;
  }

  bindDragEvent(options) {
    const {
      target,
      onClick = () => false,
      onMousedown,
      onMousemove,
      onMouseup,
      onTouchstart = () => false,
      onTouchmove = () => false,
      onTouchend = () => false,
    } = options;

    const getPositions = (e) => {
      if (e.type.includes('touch')) {
        const touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        return {
          x: touch.pageX,
          y: touch.pageY
        };
      } else {
        return {
          x: e.pageX || e.clientX,
          y: e.pageY || e.clientY
        }
      }
    }

    const $document = $(document);
    const mouseMoveFnc = (e) => onMousemove(getPositions(e));
    const mouseUpFnc = (e) => {
      e.preventDefault();
      $document.off({
        mousemove: mouseMoveFnc,
        mouseup: mouseUpFnc,
      });

      onMouseup();
    }

    target.on({
      click: (e) => {
        onClick(e);
      },
      mousedown: (e) => {
        e.preventDefault();
        e.stopPropagation();
        $document.on({
          mousemove: mouseMoveFnc,
          mouseup: mouseUpFnc,
        });
        
        onMousedown(getPositions(e));
      },
      touchstart: (e) => {
        onTouchstart(getPositions(e));
      },
      touchmove: (e) => {
        onTouchmove(getPositions(e));
      },
      touchend: () => {
        onTouchend();
      }
    })

  }

}