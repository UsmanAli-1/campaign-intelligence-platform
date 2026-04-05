import { useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function BriefOutput({ output, form, onReset }) {
  const { darkMode } = useTheme()
  const printRef = useRef()

  const handleExportPDF = async () => {
    const element = printRef.current

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      windowWidth: 800,
      scrollY: 0,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pageWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // If content fits in one page
    if (imgHeight <= pageHeight) {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    } else {
      // Split into multiple pages
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
    }

    pdf.save(`${form.clientName}-creative-brief.pdf`)
  }

  const Section = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3 pb-2 border-b border-gray-200">
        {title}
      </h3>
      {children}
    </div>
  )

  return (
    <div className={`flex-1 overflow-y-auto p-4 sm:p-6 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto">

        {/* Action Bar — responsive buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Creative Brief Generated ✨
            </h1>
            <p className={`text-xs sm:text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Generated on {new Date(output.generatedAt).toLocaleString()}
            </p>
          </div>

          {/* Buttons — stack on mobile, row on desktop */}
          <div className="flex gap-2 shrink-0">
            <button onClick={onReset}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition
                ${darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              ← New Brief
            </button>
            <button onClick={handleExportPDF}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center gap-1.5">
              📄 Export PDF
            </button>
          </div>
        </div>

        {/* Printable Content — fixed width for PDF consistency */}
        <div
          ref={printRef}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 text-gray-800"
          style={{ width: '100%', boxSizing: 'border-box' }}>

          {/* Header */}
          <div className="text-center mb-6 pb-6 border-b border-gray-200">
            <div className="text-blue-600 font-bold text-base mb-2">AdIntel</div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              {output.campaignTitle}
            </h1>
            <p className="text-xs text-gray-500 mt-2">
              Creative Brief · {form.clientName} · {new Date(output.generatedAt).toLocaleDateString()}
            </p>
          </div>

          {/* Headlines */}
          <Section title="Campaign Headlines">
            <div className="space-y-2">
              {output.headlines.map((h, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium text-gray-800 leading-snug">{h}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Tone of Voice */}
          <Section title="Tone of Voice Guide">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="mb-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                  {output.toneGuide.primary}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                {output.toneGuide.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-green-700 mb-1.5">✅ Do's</p>
                  {output.toneGuide.doList.map((d, i) => (
                    <p key={i} className="text-xs text-gray-600 mb-0.5">• {d}</p>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold text-red-600 mb-1.5">❌ Don'ts</p>
                  {output.toneGuide.dontList.map((d, i) => (
                    <p key={i} className="text-xs text-gray-600 mb-0.5">• {d}</p>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Visual Direction */}
          <Section title="Visual Direction">
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Hero Image Concept</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {output.visualDirection.heroImageConcept}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-1">Imagery Style</p>
                  <p className="text-sm text-gray-700">{output.visualDirection.imageryStyle}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-1">Color Palette</p>
                  <p className="text-sm text-gray-700">{output.visualDirection.colorPalette}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">Mood Keywords</p>
                <div className="flex flex-wrap gap-1.5">
                  {output.visualDirection.moodKeywords.map((k, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-full">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* Channels */}
          <Section title="Recommended Channels & Budget">
            <div className="space-y-2.5">
              {output.channels.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-700 w-24 shrink-0">{c.channel}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full"
                      style={{ width: `${c.allocation}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right shrink-0">{c.allocation}%</span>
                  <span className="text-xs font-semibold text-gray-800 w-16 text-right shrink-0">
                    ${c.budget.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          {/* Messaging Strategy */}
          <Section title="Messaging Strategy">
            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
              {output.messagingStrategy}
            </p>
          </Section>

          {/* Content Ideas */}
          <Section title="Content Ideas">
            <div className="space-y-2">
              {output.contentIdeas.map((idea, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5 shrink-0">→</span>
                  <p className="text-sm text-gray-700 leading-snug">{idea}</p>
                </div>
              ))}
            </div>
          </Section>

        </div>
      </div>
    </div>
  )
}