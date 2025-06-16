function getLeaves() {
  const leaves = localStorage.getItem('leaves');
  if (leaves) {
    return JSON.parse(leaves);
  } else {
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

function calculateDuration(from, to) {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const diffTime = toDate - fromDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays === 1 ? "1 Day" : `${diffDays} Days`;
}

function saveLeaves(leaves) {
  localStorage.setItem('leaves', JSON.stringify(leaves));
}

function renderApprovalTable() {
  const leaves = getLeaves();
  const tbody = document.getElementById('approvalBody');
  tbody.innerHTML = '';

  let total = 0;
  let pending = 0;
  let approved = 0;

  leaves.forEach((leave, index) => {
    const tr = document.createElement('tr');
    tr.className = "hover:bg-gray-100 cursor-pointer border-b border-gray-200";

    total++;
    if (leave.status === 'Pending') pending++;
    else if (leave.status === 'Approved') approved++;

    let statusColor = 'text-gray-700';
    if (leave.status === 'Approved') statusColor = 'text-green-600 font-semibold';
    else if (leave.status === 'Rejected') statusColor = 'text-red-600 font-semibold';
    else if (leave.status === 'Pending') statusColor = 'text-yellow-600 font-semibold';

    tr.innerHTML = `
      <td class="px-3 py-2 border-r border-gray-200">${leave.employeeName}</td>
      <td class="px-3 py-2 border-r border-gray-200">${leave.leaveType}</td>
      <td class="px-3 py-2 border-r border-gray-200">${leave.fromDate}</td>
      <td class="px-3 py-2 border-r border-gray-200">${leave.toDate}</td>
      <td class="px-3 py-2"><span class="${statusColor}">${leave.status}</span></td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('totalLeaves').textContent = total;
  document.getElementById('pendingLeaves').textContent = pending;
  document.getElementById('approvedLeaves').textContent = approved;
}

renderApprovalTable();
