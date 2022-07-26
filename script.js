const input = document.querySelector("input");
const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");

const debounce = (cb, delay = 1000) => {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			cb(...args);
		}, delay);
	};
};
const updateDebounceText = debounce(text => {
	debounceText.textContent = text;
});

const throttle = (cb, delay = 1000) => {
	let shouldWait = false;
	let waitingArgs = null;
	return (...args) => {
		if (shouldWait) {
			waitingArgs = args;
			return;
		}
		cb(...args);
		shouldWait = true;
		setTimeout(() => {
			if (waitingArgs == null) {
				shouldWait = false;
			} else {
				cb(...waitingArgs);
				waitingArgs = null;
				setTimeout(() => {
					shouldWait = false;
				});
			}
		}, delay);
	};
};
const updateThrottleText = throttle(text => {
	throttleText.textContent = text;
});

const incrementCount = element =>
	(element.textContent = (parseInt(element.innerText) || 0) + 1);

document.addEventListener("mousemove", () => {
	incrementCount(defaultText);
	// updateDebounceText();
	// updateThrottleText();
});
input.addEventListener("input", e => {
	updateThrottleText(e.target.value);
	updateDebounceText(e.target.value);
});
