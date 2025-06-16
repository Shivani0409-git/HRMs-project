// manager.js

// Get leaves from localStorage or initialize sample data if none
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
        status: "Pending"
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

// Save leaves to localStorage
function saveLeaves(leaves) {
  localStorage.setItem('leaves', JSON.stringify(leaves));
}

// Render leave requests with action buttons
function renderApprovalTable() {
  const leaves = getLeaves();
  const tbody = document.getElementById('approvalBody');
  
  tbody.innerHTML = '';

  leaves.forEach((leave, index) => {
    const tr = document.createElement('tr');
    tr.className = index % 2 === 0 ? 'border-b border-gray-200' : '';

    // Status badge color
    let statusColor = 'text-gray-700';
    if (leave.status === 'Approved') statusColor = 'text-green-600 font-semibold';
    else if (leave.status === 'Rejected') statusColor = 'text-red-600 font-semibold';
    else if (leave.status === 'Pending') statusColor = 'text-yellow-600 font-semibold';

    tr.innerHTML = `
      <td class="px-3 py-2 border-r border-gray-200">${leave.employeeName}</td>
      <td class="px-3 py-2 border-r border-gray-200">${leave.leaveType}</td>
      <td class="px-3 py-2 border-r border-gray-200">${leave.fromDate}</td>
      <td class="px-3 py-2 border-r border-gray-200">${leave.toDate}</td>
      <td class="px-3 py-2 border-r border-gray-200">${leave.reason}</td>
      <td class="px-3 py-2 border-r border-gray-200"><span class="${statusColor}">${leave.status}</span></td>
      <td class="px-3 py-2 text-center space-x-2">
        <button data-index="${index}" data-action="approve" class="approveBtn bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold disabled:opacity-50" ${leave.status !== 'Pending' ? 'disabled' : ''}>Approve</button>
        <button data-index="${index}" data-action="reject" class="rejectBtn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold disabled:opacity-50" ${leave.status !== 'Pending' ? 'disabled' : ''}>Reject</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Attach event listeners to buttons
  document.querySelectorAll('.approveBtn, .rejectBtn').forEach(button => {
    button.addEventListener('click', function () {
      const idx = parseInt(this.getAttribute('data-index'));
      const action = this.getAttribute('data-action');
      updateLeaveStatus(idx, action === 'approve' ? 'Approved' : 'Rejected');
    });
  });
}

// Update leave status and save
function updateLeaveStatus(index, newStatus) {
  const leaves = getLeaves();
  if (leaves[index]) {
    leaves[index].status = newStatus;
    saveLeaves(leaves);
    renderApprovalTable();
    alert(`Leave request has been ${newStatus.toLowerCase()}.`);
  }
}

// Initial render on page load
renderApprovalTable();
