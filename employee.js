// employee.js

// Utility to get leaves from localStorage or initialize with sample data
function getLeaves() {
  const leaves = localStorage.getItem('leaves');
  if (leaves) {
    return JSON.parse(leaves);
  } else {
    // Sample entries
    const sampleLeaves = [
      {
        employeeName: "John Doe",
        leaveType: "Casual",
        fromDate: "2025-06-01",
        toDate: "2025-06-05",
        reason: "Family function",
        status: "Approved"
      },
      {
        employeeName: "Jane Smith",
        leaveType: "Medical",
        fromDate: "2025-06-10",
        toDate: "2025-06-12",
        reason: "Medical treatment",
        status: "Pending"
      }
    ];
    localStorage.setItem('leaves', JSON.stringify(sampleLeaves));
    return sampleLeaves;
  }
}

// Utility to save leaves to localStorage
function saveLeaves(leaves) {
  localStorage.setItem('leaves', JSON.stringify(leaves));
}

// Render leave history table rows
function renderLeaveHistory() {
  const leaves = getLeaves();
  const tbody = document.getElementById('leaveHistoryBody');
  tbody.innerHTML = '';
  leaves.forEach((leave, index) => {
    const tr = document.createElement('tr');
    tr.className = index % 2 === 0 ? 'border-b border-gray-200' : '';
    tr.innerHTML = `
      <td class="px-3 py-2 border-r border-gray-200">${leave.employeeName}</td>
      <td class="px-3 py-2 border-r border-gray-200">${leave.leaveType}</td>
      <td class="px-3 py-2 border-r border-gray-200">${leave.fromDate}</td>
      <td class="px-3 py-2 border-r border-gray-200">${leave.toDate}</td>
      <td class="px-3 py-2 border-r border-gray-200">${leave.reason}</td>
      <td class="px-3 py-2">${leave.status}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Form validation and submission
document.getElementById('leaveForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const employeeName = this.employeeName.value.trim();
  const leaveType = this.leaveType.value;
  const fromDate = this.fromDate.value;
  const toDate = this.toDate.value;
  const reason = this.reason.value.trim();

  // Basic validation
  if (!employeeName) {
    alert('Please enter your name.');
    return;
  }
  if (!leaveType) {
    alert('Please select a leave type.');
    return;
  }
  if (!fromDate) {
    alert('Please select a start date.');
    return;
  }
  if (!toDate) {
    alert('Please select an end date.');
    return;
  }
  if (new Date(toDate) < new Date(fromDate)) {
    alert('End date cannot be before start date.');
    return;
  }
  if (!reason) {
    alert('Please enter a reason for leave.');
    return;
  }

  // Create leave object with default status "Pending"
  const newLeave = {
    employeeName,
    leaveType,
    fromDate,
    toDate,
    reason,
    status: "Pending"
  };

  // Save to localStorage
  const leaves = getLeaves();
  leaves.push(newLeave);
  saveLeaves(leaves);

  // Reset form
  this.reset();

  // Refresh leave history display
  renderLeaveHistory();

  alert('Leave application submitted successfully.');
});

// Initial render of leave history on page load
renderLeaveHistory();
