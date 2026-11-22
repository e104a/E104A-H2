/**
 * E104A-H2 API starter.
 * Create a new spreadsheet and set Script Property SPREADSHEET_ID to its ID.
 * Deploy as Web App only after configuration and testing.
 */
const E104A_H2 = {
  SHEETS: {
    SUBJECTS: 'MON_HOC',
    QUESTIONS: 'CAU_HOI',
    OPTIONS: 'DAP_AN',
    EXPLANATIONS: 'GIAI_THICH',
    EXAMS: 'DE_THI',
    DETAILS: 'CHI_TIET_BAI_THI',
    USERS: 'NGUOI_DUNG',
    SETTINGS: 'CAU_HINH'
  },
  EXAM_QUESTION_COUNT: 30,
  EXAM_DURATION_SECONDS: 1800
};

function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || 'health';
  try {
    const result = routeGet_(action, e ? e.parameter : {});
    return json_( { ok: true, data: result } );
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  }
}

function doPost(e) {
  try {
    const body = e && e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    const action = body.action || '';
    const result = routePost_(action, body);
    return json_({ ok: true, data: result });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  }
}

function routeGet_(action, params) {
  switch (action) {
    case 'health': return { service: 'E104A-H2', status: 'ready', timestamp: new Date().toISOString() };
    case 'subjects': return listSubjects_();
    case 'practiceQuestions': return getPracticeQuestions_(params.subjectId);
    default: throw new Error('Unknown GET action: ' + action);
  }
}

function routePost_(action, body) {
  switch (action) {
    case 'createExam': return createExam_(body.subjectId);
    case 'submitExam': return submitExam_(body);
    default: throw new Error('Unknown POST action: ' + action);
  }
}

function spreadsheet_() {
  const id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (!id) throw new Error('Missing Script Property SPREADSHEET_ID');
  return SpreadsheetApp.openById(id);
}

function rows_(sheetName) {
  const sh = spreadsheet_().getSheetByName(sheetName);
  if (!sh) throw new Error('Missing sheet: ' + sheetName);
  const values = sh.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values.shift().map(String);
  return values.filter(r => r.some(v => v !== '' && v != null)).map(r => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = r[i]);
    return obj;
  });
}

function listSubjects_() {
  return rows_(E104A_H2.SHEETS.SUBJECTS)
    .filter(s => String(s.TRANG_THAI).toUpperCase() === 'TRUE' || String(s.TRANG_THAI).toUpperCase() === 'ACTIVE')
    .sort((a,b) => Number(a.THU_TU || 0) - Number(b.THU_TU || 0));
}

function getPracticeQuestions_(subjectId) {
  if (!subjectId) throw new Error('subjectId is required');
  const questions = rows_(E104A_H2.SHEETS.QUESTIONS)
    .filter(q => String(q.MA_MON) === String(subjectId) && isActive_(q.TRANG_THAI))
    .sort((a,b) => Number(a.THU_TU || 0) - Number(b.THU_TU || 0));
  const options = rows_(E104A_H2.SHEETS.OPTIONS);
  const explanations = rows_(E104A_H2.SHEETS.EXPLANATIONS);
  return questions.map(q => ({
    id: q.MA_CAU_HOI,
    content: q.NOI_DUNG,
    options: options.filter(o => String(o.MA_CAU_HOI) === String(q.MA_CAU_HOI))
      .sort((a,b) => Number(a.THU_TU || 0) - Number(b.THU_TU || 0))
      .map(o => ({ label: o.KY_HIEU, text: o.NOI_DUNG, correct: truthy_(o.LA_DAP_AN_DUNG) })),
    explanation: (explanations.find(x => String(x.MA_CAU_HOI) === String(q.MA_CAU_HOI)) || {}).NOI_DUNG_GIAI_THICH || ''
  }));
}

function createExam_(subjectId) {
  if (!subjectId) throw new Error('subjectId is required');
  const all = getPracticeQuestions_(subjectId);
  if (all.length < E104A_H2.EXAM_QUESTION_COUNT) {
    throw new Error('Subject has only ' + all.length + ' active questions; 30 are required to start an exam.');
  }
  const selected = shuffle_(all).slice(0, E104A_H2.EXAM_QUESTION_COUNT);
  const attemptId = Utilities.getUuid();
  const started = new Date();
  const sh = spreadsheet_().getSheetByName(E104A_H2.SHEETS.EXAMS);
  sh.appendRow([attemptId, subjectId, started, '', E104A_H2.EXAM_DURATION_SECONDS, selected.length, '', '', 'IN_PROGRESS']);
  return {
    attemptId: attemptId,
    subjectId: subjectId,
    startedAt: started.toISOString(),
    durationSeconds: E104A_H2.EXAM_DURATION_SECONDS,
    questions: selected.map(q => ({ id: q.id, content: q.content, options: q.options.map(o => ({label:o.label, text:o.text})) }))
  };
}

function submitExam_(body) {
  if (!body.attemptId || !Array.isArray(body.answers)) throw new Error('attemptId and answers[] are required');
  const examSheet = spreadsheet_().getSheetByName(E104A_H2.SHEETS.EXAMS);
  const examValues = examSheet.getDataRange().getValues();
  const headers = examValues[0].map(String);
  const idCol = headers.indexOf('MA_LAN_THI');
  const statusCol = headers.indexOf('TRANG_THAI');
  const rowIndex = examValues.findIndex((r, i) => i > 0 && String(r[idCol]) === String(body.attemptId));
  if (rowIndex < 1) throw new Error('Exam attempt not found');
  if (String(examValues[rowIndex][statusCol]) !== 'IN_PROGRESS') throw new Error('Exam already submitted');
  const subjectCol = headers.indexOf('MA_MON');
  const subjectId = examValues[rowIndex][subjectCol];
  const questions = getPracticeQuestions_(subjectId);
  const qMap = {};
  questions.forEach(q => qMap[q.id] = q);
  const detailsSheet = spreadsheet_().getSheetByName(E104A_H2.SHEETS.DETAILS);
  const answersMap = {};
  body.answers.forEach(a => answersMap[String(a.questionId)] = String(a.optionLabel || ''));
  let correct = 0;
  const selectedQuestions = body.questionIds && body.questionIds.length ? body.questionIds.map(id => qMap[String(id)]).filter(Boolean) : questions;
  selectedQuestions.forEach((q, i) => {
    const selected = answersMap[q.id] || '';
    const correctOpt = q.options.find(o => o.correct);
    const correctLabel = correctOpt ? correctOpt.label : '';
    const isCorrect = selected === correctLabel;
    if (isCorrect) correct++;
    detailsSheet.appendRow([body.attemptId, q.id, selected, correctLabel, isCorrect, i + 1]);
  });
  const score = selectedQuestions.length ? correct / selectedQuestions.length * 10 : 0;
  examSheet.getRange(rowIndex + 1, headers.indexOf('NGAY_KET_THUC') + 1).setValue(new Date());
  examSheet.getRange(rowIndex + 1, headers.indexOf('SO_CAU_DUNG') + 1).setValue(correct);
  examSheet.getRange(rowIndex + 1, headers.indexOf('DIEM') + 1).setValue(score);
  examSheet.getRange(rowIndex + 1, statusCol + 1).setValue('SUBMITTED');
  return { attemptId: body.attemptId, total: selectedQuestions.length, correct: correct, score: score };
}

function isActive_(v) {
  return String(v).toUpperCase() === 'TRUE' || String(v).toUpperCase() === 'ACTIVE' || v === true || v === 1;
}
function truthy_(v) { return v === true || v === 1 || String(v).toUpperCase() === 'TRUE'; }
function shuffle_(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
