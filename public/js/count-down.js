function startCountdown(targetDate, element) {
  const targetTime = new Date(targetDate).getTime();

  const countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeRemaining = targetTime - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    if (element) {
      // Set the content of the element based on its ID
      if (element.id === 'countdown1') {
        element.textContent = days.toString().padStart(2, '0');
      } else if (element.id === 'countdown2') {
        element.textContent = hours.toString().padStart(2, '0');
      } else if (element.id === 'countdown3') {
        element.textContent = minutes.toString().padStart(2, '0');
      } else if (element.id === 'countdown4') {
        element.textContent = seconds.toString().padStart(2, '0');
      }
    }
  }, 1000);
}

// Example usage
const targetDate1 = new Date('2023-03-20T19:00:00');
const element1 = document.querySelector('#countdown1');
startCountdown(targetDate1, element1);

const targetDate2 = new Date('2023-03-20T19:00:00');
const element2 = document.querySelector('#countdown2');
startCountdown(targetDate2, element2);

const targetDate3 = new Date('2023-03-20T19:00:00');
const element3 = document.querySelector('#countdown3');
startCountdown(targetDate3, element3);

const targetDate4 = new Date('2023-03-20T19:00:00');
const element4 = document.querySelector('#countdown4');
startCountdown(targetDate4, element4);

// Get the withdraw button element
const withdrawBtn = document.getElementById('withdrawBtn');
// Add a click event listener to the withdraw button
function withdraw() {
  // Retrieve the withdrawal amount
  const withdrawalAmount = 99;

  // Check if the withdrawal amount is less than 100
  if (withdrawalAmount < 100) {
    alert(
      'Minimum withdrawal amount is 100 XINK. Withdrawal Will be enabled on 10th April 2023!'
    );
  }
}

const copyToClipboard = (text) => {
  const element = document.createElement('textarea');
  element.value = text;
  document.body.appendChild(element);
  element.select();
  document.execCommand('copy');
  document.body.removeChild(element);
};

const copyButton = document.getElementById('copyToClipboard');
const referralCode = document.getElementById('referralCode');

if (copyButton) {
  copyButton.addEventListener('click', () => {
    copyToClipboard(referralCode.innerText);
    alert('Referral code copied to clipboard');
  });
}

// mining button
const miningBtn = document.getElementById('startMining');

const checkLastMiningDate = async () => {
  const response = await fetch('http://localhost:3001/api/mining/last-mining-date');
  const data = await response.json();
  return data;
};

const setMiningTimeout = (data) => {
  if (!data.canMine) {
    miningBtn.classList.add('disabled');
    miningBtn.innerHTML = `Come back in (${data.remainingHours} hour(s) time)`;
  }
};

const handleMiningBtnClick = async () => {
  const response = await fetch('http://localhost:3001/api/mining/last-mining-date');
  const data = await response.json();
  const canMine = data.canMine;

  if (!canMine) {
    alert(data.message);
  } else {
    miningBtn.classList.add('disabled');
    miningBtn.innerHTML = 'Mining in progress...';
    setTimeout(() => {
      miningBtn.classList.remove('disabled');
      miningBtn.innerHTML = 'Click to Mine';
    }, 5000);
  }
};

checkLastMiningDate().then(setMiningTimeout);
if (miningBtn) {
  miningBtn.addEventListener('click', handleMiningBtnClick);
}
