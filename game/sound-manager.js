class SoundManager {
    constructor() {
        this.loadAllSound();
    }

    loadAllSound() {
        this.soundFiles = Object.keys(SoundData).reduce((soundFiles, soundPath) => ({
            ...soundFiles,
            [soundPath]: loadSound(`assets/sounds/${SoundData[soundPath]}`)
        }), {});
    }

    playSound(soundFile, volume) {
        this.soundFiles[soundFile].setVolume(volume);
        this.soundFiles[soundFile].play();
    }
}