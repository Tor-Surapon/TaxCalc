document.getElementById('yearlyIncome').addEventListener('input', calculateTax);
document.getElementById('insuranceDeduction').addEventListener('input', calculateDeductions);
document.getElementById('hasSpouse').addEventListener('change', calculateDeductions);
document.getElementById('childCount').addEventListener('input', calculateDeductions);
document.getElementById('hasFather').addEventListener('change', calculateDeductions);
document.getElementById('hasMother').addEventListener('change', calculateDeductions);
document.getElementById('hasDisabilityPerson').addEventListener('change', calculateDeductions);
document.getElementById('hasDisabilitySpouse').addEventListener('change', calculateDeductions);
document.getElementById('disabilityChildCount').addEventListener('input', calculateDeductions);
document.getElementById('hasPregnancy').addEventListener('change', function() {
    document.getElementById('pregnancyExpense').disabled = !this.checked;
    calculateDeductions();
});
document.getElementById('pregnancyExpense').addEventListener('input', calculateDeductions);

// รายการลดหย่อนทั้งหมดที่ต้องมี checkbox ควบคุม input
const deductionFields = [
    { checkbox: 'hasPregnancy', input: 'pregnancyExpense' },
    { checkbox: 'hasLifeInsurance', input: 'lifeInsuranceExpense' },
    { checkbox: 'hasFatherHealth', input: 'fatherHealthExpense' },
    { checkbox: 'hasMotherHealth', input: 'motherHealthExpense' },
    { checkbox: 'hasHealthInsurance', input: 'healthInsuranceExpense' },
    { checkbox: 'hasPensionFund', input: 'pensionFundExpense' },
    { checkbox: 'hasRMF', input: 'rmfExpense' },
    { checkbox: 'hasAnnuityInsurance', input: 'annuityInsuranceExpense' },
    { checkbox: 'hasNSF', input: 'nsfExpense' },
    { checkbox: 'hasSSF', input: 'ssfExpense' },
    { checkbox: 'hasHomeLoan', input: 'homeLoanExpense' },
    { checkbox: 'hasPoliticalDonation', input: 'politicalDonationExpense' },
    { checkbox: 'hasSocialEnterprise', input: 'socialEnterpriseExpense' },
    { checkbox: 'hasEReceipt', input: 'eReceiptExpense' },
    { checkbox: 'hasThaiESG', input: 'thaiESGExpense' },
    { checkbox: 'hasSecondaryTourism', input: 'secondaryTourismExpense' },
    { checkbox: 'hasNewHouse', input: 'newHouseExpense' },
    { checkbox: 'hasFloodHouseRepair', input: 'floodHouseRepairExpense' },
    { checkbox: 'hasFloodCarRepair', input: 'floodCarRepairExpense' },
    { checkbox: 'hasEducationDonation', input: 'educationDonationExpense' },
    { checkbox: 'hasGeneralDonation', input: 'generalDonationExpense' }
];

// เพิ่ม event listeners สำหรับทุกฟิลด์
deductionFields.forEach(field => {
    const checkbox = document.getElementById(field.checkbox);
    const input = document.getElementById(field.input);
    
    if (checkbox && input) {
        checkbox.addEventListener('change', function() {
            input.disabled = !this.checked;
            calculateDeductions();
        });
        input.addEventListener('input', calculateDeductions);
    }
});

function calculateDeductions() {
    const personalDeduction = 60000;
    const spouseDeduction = document.getElementById('hasSpouse').checked ? 60000 : 0;
    const childCount = parseInt(document.getElementById('childCount').value) || 0;
    const childDeduction = Math.min(childCount, 3) * 30000;
    
    // คำนวณค่าลดหย่อนบิดามารดา
    const fatherDeduction = document.getElementById('hasFather').checked ? 30000 : 0;
    const motherDeduction = document.getElementById('hasMother').checked ? 30000 : 0;
    const parentDeduction = fatherDeduction + motherDeduction;
    
    // คำนวณค่าลดหย่อนผู้พิการ
    const disabilityPersonDeduction = document.getElementById('hasDisabilityPerson').checked ? 60000 : 0;
    const disabilitySpouseDeduction = document.getElementById('hasDisabilitySpouse').checked ? 60000 : 0;
    const disabilityChildCount = parseInt(document.getElementById('disabilityChildCount').value) || 0;
    const disabilityChildDeduction = disabilityChildCount * 60000;
    const disabilityDeduction = disabilityPersonDeduction + disabilitySpouseDeduction + disabilityChildDeduction;
    
    // คำนวณค่าฝากครรภ์และทำคลอด
    const pregnancyExpense = document.getElementById('hasPregnancy').checked ? 
        Math.min(parseFloat(document.getElementById('pregnancyExpense').value) || 0, 60000) : 0;
    
    // คำนวณเบี้ยประกันชีวิต
    const lifeInsurance = document.getElementById('hasLifeInsurance').checked ?
        Math.min(parseFloat(document.getElementById('lifeInsuranceExpense').value) || 0, 100000) : 0;
    
    // คำนวณเบี้ยประกันสุขภาพบิดามารดา
    const fatherHealth = document.getElementById('hasFatherHealth').checked ?
        Math.min(parseFloat(document.getElementById('fatherHealthExpense').value) || 0, 15000) : 0;
    const motherHealth = document.getElementById('hasMotherHealth').checked ?
        Math.min(parseFloat(document.getElementById('motherHealthExpense').value) || 0, 15000) : 0;
    const parentsHealthDeduction = fatherHealth + motherHealth;
    
    // คำนวณเบี้ยประกันสุขภาพตัวเอง
    const healthInsurance = document.getElementById('hasHealthInsurance').checked ?
        Math.min(parseFloat(document.getElementById('healthInsuranceExpense').value) || 0, 25000) : 0;
    
    // คำนวณกองทุนสำรองเลี้ยงชีพ
    const pensionFund = document.getElementById('hasPensionFund').checked ?
        Math.min(parseFloat(document.getElementById('pensionFundExpense').value) || 0, 10000) : 0;
    
    // คำนวณ RMF
    const rmfExpense = document.getElementById('hasRMF').checked ?
        Math.min(parseFloat(document.getElementById('rmfExpense').value) || 0, 500000) : 0;
    
    // คำนวณประกันชีวิตแบบบำนาญ
    const annuityInsurance = document.getElementById('hasAnnuityInsurance').checked ?
        Math.min(parseFloat(document.getElementById('annuityInsuranceExpense').value) || 0, 200000) : 0;
    
    // คำนวณค่าลดหย่อนใหม่
    const nsfDeduction = document.getElementById('hasNSF').checked ?
        Math.min(parseFloat(document.getElementById('nsfExpense').value) || 0, 30000) : 0;
    
    const ssfDeduction = document.getElementById('hasSSF').checked ?
        Math.min(parseFloat(document.getElementById('ssfExpense').value) || 0, 200000) : 0;
    
    const homeLoanDeduction = document.getElementById('hasHomeLoan').checked ?
        Math.min(parseFloat(document.getElementById('homeLoanExpense').value) || 0, 100000) : 0;
    
    const politicalDonation = document.getElementById('hasPoliticalDonation').checked ?
        Math.min(parseFloat(document.getElementById('politicalDonationExpense').value) || 0, 10000) : 0;
    
    const socialEnterprise = document.getElementById('hasSocialEnterprise').checked ?
        parseFloat(document.getElementById('socialEnterpriseExpense').value) || 0 : 0;
    
    const eReceipt = document.getElementById('hasEReceipt').checked ?
        Math.min(parseFloat(document.getElementById('eReceiptExpense').value) || 0, 50000) : 0;
    
    const thaiESG = document.getElementById('hasThaiESG').checked ?
        Math.min(parseFloat(document.getElementById('thaiESGExpense').value) || 0, 300000) : 0;
    
    const secondaryTourism = document.getElementById('hasSecondaryTourism').checked ?
        Math.min(parseFloat(document.getElementById('secondaryTourismExpense').value) || 0, 40000) : 0;
    
    const newHouse = document.getElementById('hasNewHouse').checked ?
        Math.min(parseFloat(document.getElementById('newHouseExpense').value) || 0, 5000000) * 0.5 : 0;
    
    const floodHouseRepair = document.getElementById('hasFloodHouseRepair').checked ?
        Math.min(parseFloat(document.getElementById('floodHouseRepairExpense').value) || 0, 100000) : 0;
    
    const floodCarRepair = document.getElementById('hasFloodCarRepair').checked ?
        Math.min(parseFloat(document.getElementById('floodCarRepairExpense').value) || 0, 30000) : 0;
    
    const educationDonation = document.getElementById('hasEducationDonation').checked ?
        parseFloat(document.getElementById('educationDonationExpense').value) * 2 || 0 : 0;
    
    const generalDonation = document.getElementById('hasGeneralDonation').checked ?
        parseFloat(document.getElementById('generalDonationExpense').value) || 0 : 0;
    
    const insuranceDeduction = parseFloat(document.getElementById('insuranceDeduction').value) || 0;
    const totalDeduction = personalDeduction + spouseDeduction + childDeduction + 
        parentDeduction + disabilityDeduction + pregnancyExpense + 
        lifeInsurance + parentsHealthDeduction + healthInsurance +
        pensionFund + rmfExpense + annuityInsurance + insuranceDeduction +
        nsfDeduction + ssfDeduction + homeLoanDeduction + politicalDonation +
        socialEnterprise + eReceipt + thaiESG + secondaryTourism + newHouse +
        floodHouseRepair + floodCarRepair + educationDonation + generalDonation;
    
    // แสดงผลลัพธ์
    document.getElementById('spouseDeduction').disabled = !document.getElementById('hasSpouse').checked;
    document.getElementById('childDeduction').value = childDeduction.toFixed(2);
    document.getElementById('parentDeduction').value = parentDeduction.toFixed(2);
    document.getElementById('disabilityDeduction').value = disabilityDeduction.toFixed(2);
    document.getElementById('pregnancyDeduction').value = pregnancyExpense.toFixed(2);
    document.getElementById('parentsHealthDeduction').value = parentsHealthDeduction.toFixed(2);
    document.getElementById('totalDeduction').value = totalDeduction.toFixed(2);

    // เรียกคำนวณภาษีใหม่เมื่อค่าลดหย่อนเปลี่ยน
    calculateTax();
}

function calculateTax() {
    const yearlyIncome = parseFloat(document.getElementById('yearlyIncome').value) || 0;
    const totalDeduction = parseFloat(document.getElementById('totalDeduction').value) || 0;
    
    // คำนวณค่าใช้จ่าย 50% แต่ไม่เกิน 100,000 บาท
    const expenses = Math.min(yearlyIncome * 0.5, 100000);
    
    // คำนวณเงินได้สุทธิสำหรับคำนวณภาษี
    const netIncome = yearlyIncome - expenses;
    const netTaxableIncome = Math.max(netIncome - totalDeduction, 0);
    
    // คำนวณภาษี
    let taxAmount = 0;
    let taxRate = '';
    
    if (netTaxableIncome <= 150000) {
        taxRate = '0%';
    } else if (netTaxableIncome <= 300000) {
        taxAmount = (netTaxableIncome - 150000) * 0.05;
        taxRate = '5%';
    } else if (netTaxableIncome <= 500000) {
        taxAmount = ((netTaxableIncome - 300000) * 0.10) + (150000 * 0.05);
        taxRate = '10%';
    } else if (netTaxableIncome <= 750000) {
        taxAmount = ((netTaxableIncome - 500000) * 0.15) + (200000 * 0.10) + (150000 * 0.05);
        taxRate = '15%';
    } else if (netTaxableIncome <= 1000000) {
        taxAmount = ((netTaxableIncome - 750000) * 0.20) + (250000 * 0.15) + (200000 * 0.10) + (150000 * 0.05);
        taxRate = '20%';
    } else if (netTaxableIncome <= 2000000) {
        taxAmount = ((netTaxableIncome - 1000000) * 0.25) + (250000 * 0.20) + (250000 * 0.15) + (200000 * 0.10) + (150000 * 0.05);
        taxRate = '25%';
    } else if (netTaxableIncome <= 5000000) {
        taxAmount = ((netTaxableIncome - 2000000) * 0.30) + (1000000 * 0.25) + (250000 * 0.20) + (250000 * 0.15) + (200000 * 0.10) + (150000 * 0.05);
        taxRate = '30%';
    } else {
        taxAmount = ((netTaxableIncome - 5000000) * 0.35) + (3000000 * 0.30) + (1000000 * 0.25) + (250000 * 0.20) + (250000 * 0.15) + (200000 * 0.10) + (150000 * 0.05);
        taxRate = '35%';
    }
    
    // ภาษีที่บริษัทหักนำส่ง
    const withholding = parseFloat(document.getElementById('withholding').value) || 0;
    
    // คำนวณภาษีที่ต้องชำระเพิ่ม/ได้รับคืน
    const taxResult = withholding - taxAmount;
    
    // แสดงผลลัพธ์
    document.getElementById('expenses').value = expenses.toFixed(2);
    document.getElementById('netIncome').value = netIncome.toFixed(2);
    document.getElementById('netTaxableIncome').value = netTaxableIncome.toFixed(2);
    document.getElementById('taxRate').value = taxRate;
    document.getElementById('taxAmount').value = taxAmount.toFixed(2);
    document.getElementById('withholding').value = withholding.toFixed(2);
    document.getElementById('taxResult').value = taxResult.toFixed(2);

    // อัพเดทข้อความและสีของผลลัพธ์
    const taxResultLabel = document.getElementById('taxResultLabel');
    const taxResultInput = document.getElementById('taxResult');
    
    if (taxResult > 0) {
        taxResultLabel.textContent = "ภาษีที่ได้รับคืน:";
        taxResultInput.style.color = "#28a745"; // สีเขียว
    } else if (taxResult < 0) {
        taxResultLabel.textContent = "ภาษีที่ต้องชำระเพิ่ม:";
        taxResultInput.style.color = "#dc3545"; // สีแดง
        taxResultInput.value = Math.abs(taxResult).toFixed(2);
    } else {
        taxResultLabel.textContent = "ภาษีที่ต้องชำระเพิ่ม/ได้รับคืน:";
        taxResultInput.style.color = "#000000"; // สีดำ
    }
}

// Add event listeners
document.getElementById('yearlyIncome').addEventListener('input', calculateTax);
document.getElementById('withholding').addEventListener('input', calculateTax);
document.getElementById('totalDeduction').addEventListener('input', calculateTax);
