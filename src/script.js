
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Materialize components
  M.AutoInit();
  
  // DOM elements
  const participantForm = document.getElementById('participant-form');
  const participantInput = document.getElementById('participant-name');
  const participantsList = document.getElementById('participants-list');
  const participantCount = document.getElementById('participant-count');
  const drawButton = document.getElementById('draw-button');
  const winnerDisplay = document.getElementById('winner-display');
  const winnerName = document.getElementById('winner-name');
  const drawHistory = document.getElementById('draw-history');
  const clearHistoryButton = document.getElementById('clear-history');
  const confettiContainer = document.getElementById('confetti-container');
  
  // State
  let participants = [];
  let drawHistoryList = [];
  
  // Add participant
  participantForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = participantInput.value.trim();
    
    if (!name) {
      return;
    }
    
    if (participants.includes(name)) {
      showToast('Participante já adicionado', 'red');
      return;
    }
    
    participants.push(name);
    participantInput.value = '';
    participantInput.focus();
    
    updateParticipantsList();
    updateDrawButtonState();
    showToast(`${name} foi adicionado ao sorteio`, 'green');
  });
  
  // Remove participant
  function removeParticipant(name) {
    participants = participants.filter(p => p !== name);
    updateParticipantsList();
    updateDrawButtonState();
    showToast(`${name} foi removido do sorteio`, 'orange');
  }
  
  // Update participants list
  function updateParticipantsList() {
    participantsList.innerHTML = '';
    
    if (participants.length === 0) {
      participantsList.innerHTML = `
        <li class="collection-item center-align grey-text">
          Nenhum participante adicionado ainda.
        </li>
      `;
    } else {
      participants.forEach(participant => {
        const li = document.createElement('li');
        li.className = 'collection-item participant-item';
        li.innerHTML = `
          <div class="valign-wrapper">
            <i class="material-icons purple-text">person</i>
            <span style="margin-left: 8px;">${participant}</span>
            <a href="#!" class="secondary-content">
              <i class="material-icons grey-text text-darken-1 remove-participant">close</i>
            </a>
          </div>
        `;
        
        const removeBtn = li.querySelector('.remove-participant');
        removeBtn.addEventListener('click', () => removeParticipant(participant));
        
        participantsList.appendChild(li);
      });
    }
    
    participantCount.textContent = `${participants.length} participante${participants.length !== 1 ? 's' : ''} no sorteio atual`;
  }
  
  // Update draw button state
  function updateDrawButtonState() {
    if (participants.length >= 2) {
      drawButton.disabled = false;
      drawButton.classList.add('pulse-animation');
    } else {
      drawButton.disabled = true;
      drawButton.classList.remove('pulse-animation');
    }
  }
  
  // Draw winner
  drawButton.addEventListener('click', function() {
    if (participants.length < 2) {
      showToast('Adicione pelo menos 2 participantes para realizar o sorteio', 'red');
      return;
    }
    
    // Start drawing animation
    drawButton.disabled = true;
    drawButton.innerHTML = '<i class="material-icons left">hourglass_empty</i> Sorteando...';
    winnerDisplay.style.display = 'none';
    
    // Create drawing animation element
    const drawingText = document.createElement('div');
    drawingText.className = 'drawing-text center-align';
    drawingText.innerHTML = '<p class="purple-text">Selecionando um vencedor...</p>';
    drawButton.parentNode.appendChild(drawingText);
    
    // Simulate delay for effect
    setTimeout(() => {
      // Select winner
      const winnerIndex = Math.floor(Math.random() * participants.length);
      const winner = participants[winnerIndex];
      
      // Update UI
      winnerName.textContent = winner;
      winnerDisplay.style.display = 'block';
      drawingText.remove();
      
      // Reset button
      drawButton.innerHTML = '<i class="material-icons left">card_giftcard</i> Realizar Sorteio';
      drawButton.disabled = false;
      
      // Show toast
      showToast(`Parabéns! ${winner} é o vencedor!`, 'green');
      
      // Create confetti
      createConfetti();
      
      // Add to history
      addToHistory(winner);
    }, 2000);
  });
  
  // Add to history
  function addToHistory(winner) {
    const date = new Date();
    drawHistoryList.push({ winner, date });
    
    updateDrawHistory();
  }
  
  // Update draw history
  function updateDrawHistory() {
    drawHistory.innerHTML = '';
    
    if (drawHistoryList.length === 0) {
      drawHistory.innerHTML = `
        <div class="center-align grey-text" style="padding: 20px;">
          Nenhum sorteio realizado ainda.
        </div>
      `;
      clearHistoryButton.disabled = true;
    } else {
      drawHistoryList.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
          <div class="row valign-wrapper" style="margin-bottom: 10px;">
            <div class="col s2 m1">
              <i class="material-icons amber-text text-darken-2">emoji_events</i>
            </div>
            <div class="col s10 m11">
              <div style="font-weight: 500;">${item.winner}</div>
              <div class="grey-text" style="font-size: 0.9rem;">
                ${formatDate(item.date)}
              </div>
            </div>
          </div>
        `;
        drawHistory.appendChild(historyItem);
      });
      
      clearHistoryButton.disabled = false;
    }
  }
  
  // Clear history
  clearHistoryButton.addEventListener('click', function() {
    drawHistoryList = [];
    updateDrawHistory();
    showToast('O histórico de sorteios foi apagado', 'blue');
  });
  
  // Create confetti
  function createConfetti() {
    const colors = [
      '#8B5CF6', // purple
      '#D946EF', // pink
      '#FBBF24', // yellow
      '#34D399', // green
      '#60A5FA', // blue
    ];
    
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      
      // Random position
      const left = Math.random() * 100;
      confetti.style.left = `${left}%`;
      confetti.style.top = `-5%`;
      
      // Random size
      const size = 5 + Math.random() * 10;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      
      // Random color
      const color = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.backgroundColor = color;
      
      // Random shape (circle or square)
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      
      // Random rotation
      const rotation = Math.random() * 360;
      confetti.style.transform = `rotate(${rotation}deg)`;
      
      // Random animation duration
      const duration = 3 + Math.random() * 2;
      const delay = Math.random() * 0.5;
      confetti.style.animationDuration = `${duration}s`;
      confetti.style.animationDelay = `${delay}s`;
      
      confettiContainer.appendChild(confetti);
      
      // Remove confetti after animation
      setTimeout(() => {
        confetti.remove();
      }, (duration + delay) * 1000);
    }
  }
  
  // Format date
  function formatDate(date) {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Show toast
  function showToast(message, color = 'blue') {
    M.toast({
      html: message,
      classes: `${color} lighten-1 rounded`,
      displayLength: 3000
    });
  }
  
  // Initial update
  updateParticipantsList();
  updateDrawHistory();
  updateDrawButtonState();
});
