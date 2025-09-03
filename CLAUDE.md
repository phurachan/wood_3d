# Claude Code Session Notes - Wood 3D Toybox Project

## Project Overview
This is a 3D woodworking project for creating a toybox using tab-and-slot joinery system. The project includes multiple HTML files for 2D panel plans and manuals.

## Key Thai Terminology (CRITICAL - DO NOT CHANGE)
- **Tab** = "หัวต่อ" (connector/tab) - NO thickness specified in descriptions
- **Slot** = "ช่องต่อ" (connection slot) 
- **Tab & Slot System** = "ระบบหัวต่อ-ช่องต่อ"
- **Units**: Use ซม. (cm) instead of มม. (mm) - ALWAYS convert Russian мм to Thai ซม.
- **Slot (from edge)** = "รอยบาก" (slot made by notching from edge)  
- **Slot (in wood)** = "ช่องต่ออแบบเจาะรู" → simplified to "รูเจาะ" (slot made by drilling hole inside wood)
- **Corner cutting** = "รอยตัดมุม" (for rounded tab corners) - NOT "รอยบาก"

## File Structure & Purposes
- `panel_manual.html` - Main manual with standardized format for all 5 panels
- `toybox_plan_2d.html` - 2D planning interface
- `panel_2d_converter.html` - Panel conversion utilities
- Panel specifications: Top, Bottom, Left, Right, Back panels

## Standard Panel Manual Format (MUST FOLLOW)
Each panel section should have:

### Basic Details (detail-item):
- ขนาด: (dimensions in ซม.)
- วัสดุ: (material specification)  
- มุมโค้ง: รัศมี 1 ซม. ทุกมุม
- หัวต่อ/รอยบาก/รูเจาะ: (with reference to detailed section)

### Detailed Sections (holes-list):
- Use consistent naming: "หัวต่อ (X หัวต่อ)", "รอยบาก (X รอย)", "รูเจาะ (X รู)"
- Number items: "หัวต่อ 1:", "รู 1:", "รอยบาก 1:" etc.
- Include direction: "ด้านซ้าย", "ด้านขวา", "ด้านบน", "ด้านล่าง"
- Specify dimensions and positions clearly

### Assembly Instructions (joinery-info):
- Explain how each component connects to others
- Use consistent language about insertion directions

## Panel Specifications Reference
- **Top Panel**: 5 หัวต่อ (ซ้าย 2, ขวา 2, ล่าง 1)
- **Bottom Panel**: 5 หัวต่อ (ซ้าย 2, ขวา 2, บน 1) 
- **Left Panel**: รอยบาก ด้านซ้าย 2 จุด + รูเจาะ ด้านขวา 2 จุด + หัวต่อ ด้านล่าง 1 จุด
- **Right Panel**: รอยบาก ด้านขวา 2 จุด + รูเจาะ ด้านซ้าย 2 จุด + หัวต่อ ด้านล่าง 1 จุด  
- **Back Panel**: รูเจาะ รอบด้าน 4 จุด (ซ้าย, ขวา, ล่าง, บน)

## Critical Measurements
- Standard slot dimensions: 1×4 ซม. เจาะเข้าไป 1 ซม.
- Standard tab thickness: 1 ซม. (but don't specify thickness in หัวต่อ descriptions)
- Corner radius: รัศมี 1 ซม. ทุกมุม
- Back panel size: 42×41×1 ซม.
- Other panels: 40×20×1 ซม.

## Print Layout CSS (IMPORTANT)
```css
@media print {
    .panel-content { 
        display: block !important; 
        grid-template-columns: none !important; 
    }
    .panel-diagram { margin-bottom: 20px; }
    .page-break-after-details { page-break-before: always; }
}
```
- Single column layout for printing
- Page break after basic details, before detailed sections
- Keep related holes-list sections together on same page

## Common Issues & Solutions
1. **Russian мм units**: Always convert to Thai ซม. using sed commands
2. **Multiple holes-list**: First one gets `page-break-after-details` class, others don't
3. **Terminology consistency**: Never change agreed Thai terms, especially รอยตัดมุม vs รอยบาก
4. **Slot dimensions**: 1×4 ซม. is standard (not 1×2 ซม.)

## Session Context Pattern
User typically works on:
1. Terminology updates and corrections
2. Unit conversions (мм → ซม.)  
3. Format standardization across panels
4. Print layout adjustments
5. Adding missing specifications

## File Editing Approach
- Always read files before editing
- Use MultiEdit for multiple changes in same file
- Prefer Edit tool over Write for existing files
- Use sed for bulk find/replace of units or terminology
- Be careful with similar content across panels - provide unique context for edits