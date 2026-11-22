# E104A-H2 – Database Schema

Use a new Google Spreadsheet. Each tab is a table. Row 1 is the header; do not rename headers.

## MON_HOC
`MA_MON | TEN_MON | THU_TU | TRANG_THAI`

## CAU_HOI
`MA_CAU_HOI | MA_MON | NOI_DUNG | THU_TU | TRANG_THAI | NGAY_TAO | NGAY_CAP_NHAT`

## DAP_AN
`MA_DAP_AN | MA_CAU_HOI | KY_HIEU | NOI_DUNG | LA_DAP_AN_DUNG | THU_TU`
One row per option. `KY_HIEU` is A/B/C/D. Exactly one correct option per active question.

## GIAI_THICH
`MA_CAU_HOI | NOI_DUNG_GIAI_THICH`

## DE_THI
`MA_LAN_THI | MA_MON | NGAY_BAT_DAU | NGAY_KET_THUC | THOI_GIAN_GIAY | SO_CAU | SO_CAU_DUNG | DIEM | TRANG_THAI`

## CHI_TIET_BAI_THI
`MA_LAN_THI | MA_CAU_HOI | DAP_AN_DA_CHON | DAP_AN_DUNG | DUNG_SAI | THU_TU`

## NGUOI_DUNG
`MA_NGUOI_DUNG | TEN_HIEN_THI | EMAIL | VAI_TRO | TRANG_THAI`

## CAU_HINH
`KHOA | GIA_TRI | MO_TA`

## NGUYEN_TAC
- Stable question IDs (UUID) preserve links to answers/explanations when questions are reordered.
- Practice mode reads all active questions in source order and shows explanation after the user answers.
- Exam mode draws 30 random active questions for a subject, has a 30-minute timer, and stores results.
- Use a separate exam-attempt ID for each attempt. Never overwrite prior attempts.
- Do not import old project data automatically.
