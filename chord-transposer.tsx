"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Music } from "lucide-react"
import Link from "next/link"

const chordFamilies = {
  C: ["C", "Dm", "Em", "F", "G", "Am", "B°"],
  "C#": ["C#", "D#m", "E#m", "F#", "G#", "A#m", "B#°"],
  D: ["D", "Em", "F#m", "G", "A", "Bm", "C#°"],
  "D#": ["D#", "E#m", "F##m", "G#", "A#", "B#m", "C##°"],
  E: ["E", "F#m", "G#m", "A", "B", "C#m", "D#°"],
  F: ["F", "Gm", "Am", "Bb", "C", "Dm", "E°"],
  "F#": ["F#", "G#m", "A#m", "B", "C#", "D#m", "E#°"],
  G: ["G", "Am", "Bm", "C", "D", "Em", "F#°"],
  "G#": ["G#", "A#m", "B#m", "C#", "D#", "E#m", "F##°"],
  A: ["A", "Bm", "C#m", "D", "E", "F#m", "G#°"],
  "A#": ["A#", "B#m", "C##m", "D#", "E#", "F##m", "G##°"],
  B: ["B", "C#m", "D#m", "E", "F#", "G#m", "A#°"],
}

const keys = Object.keys(chordFamilies)
const romanNumerals = ["I", "ii", "iii", "IV", "V", "vi", "vii°"]

const getKeySignature = (key: string) => {
  const signatures: { [key: string]: string } = {
    C: "No ♯/♭",
    "C#": "7 ♯",
    D: "2 ♯",
    "D#": "9 ♯",
    E: "4 ♯",
    F: "1 ♭",
    "F#": "6 ♯",
    G: "1 ♯",
    "G#": "8 ♯",
    A: "3 ♯",
    "A#": "10 ♯",
    B: "5 ♯",
  }
  return signatures[key] || "Unknown"
}

const getRelativeMinor = (key: string) => {
  const relatives: { [key: string]: string } = {
    C: "Am",
    "C#": "A#m",
    D: "Bm",
    "D#": "B#m",
    E: "C#m",
    F: "Dm",
    "F#": "D#m",
    G: "Em",
    "G#": "E#m",
    A: "F#m",
    "A#": "F##m",
    B: "G#m",
  }
  return relatives[key] || "Unknown"
}

const getCirclePosition = (key: string) => {
  const positions: { [key: string]: string } = {
    C: "12 o'clock",
    G: "1 o'clock",
    D: "2 o'clock",
    A: "3 o'clock",
    E: "4 o'clock",
    B: "5 o'clock",
    "F#": "6 o'clock",
    "C#": "7 o'clock",
    "G#": "8 o'clock",
    "D#": "9 o'clock",
    "A#": "10 o'clock",
    F: "11 o'clock",
  }
  return positions[key] || "Unknown"
}

export default function Component() {
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0)

  const currentKey = keys[currentKeyIndex]
  const currentChords = chordFamilies[currentKey as keyof typeof chordFamilies]

  const goToPreviousKey = () => {
    setCurrentKeyIndex((prev) => (prev - 1 + keys.length) % keys.length)
  }

  const goToNextKey = () => {
    setCurrentKeyIndex((prev) => (prev + 1) % keys.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-md sm:max-w-2xl lg:max-w-4xl shadow-xl">
        <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Music className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            <CardTitle className="text-lg sm:text-2xl font-bold text-gray-800">Chord Family</CardTitle>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
            Navigate through different keys to transpose chord progressions
          </p>
        </CardHeader>

        <CardContent className="px-4 sm:px-6">
          {/* Navigation and Key Display */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <Button
              variant="outline"
              size="lg"
              onClick={goToPreviousKey}
              className="h-14 w-14 sm:h-16 sm:w-16 rounded-full shadow-md hover:shadow-lg transition-shadow bg-white touch-manipulation"
            >
              <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
            </Button>

            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-1">{currentKey}</h2>
              <p className="text-xs sm:text-sm text-gray-500">Major Scale</p>
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={goToNextKey}
              className="h-14 w-14 sm:h-16 sm:w-16 rounded-full shadow-md hover:shadow-lg transition-shadow bg-white touch-manipulation"
            >
              <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
            </Button>
          </div>

          {/* Mobile-First Chord Grid */}
          <div className="space-y-3 sm:space-y-4 mb-6">
            {/* First Row - 4 chords */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {currentChords.slice(0, 4).map((chord, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md border-2 border-gray-200 hover:border-blue-300 transition-colors touch-manipulation">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1 font-medium">{romanNumerals[index]}</div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">{chord}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Row - 3 chords */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-xs mx-auto">
              {currentChords.slice(4, 7).map((chord, index) => (
                <div key={index + 4} className="text-center">
                  <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md border-2 border-gray-200 hover:border-blue-300 transition-colors touch-manipulation">
                    <div className="text-xs sm:text-sm text-gray-500 mb-1 font-medium">{romanNumerals[index + 4]}</div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">{chord}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Musical Information */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-blue-700">Key Signature</div>
                <div className="text-gray-700">{getKeySignature(currentKey)}</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-700">Relative Minor</div>
                <div className="text-gray-700">{getRelativeMinor(currentKey)}</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-700">Circle Position</div>
                <div className="text-gray-700">{getCirclePosition(currentKey)}</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-700">Common Progression</div>
                <div className="text-gray-700">vi-IV-I-V</div>
              </div>
            </div>

            <div className="border-t border-blue-200 pt-3">
              <div className="text-center">
                <div className="font-semibold text-blue-700 mb-2">Popular Chord Progression in {currentKey}:</div>
                <div className="flex justify-center gap-2 flex-wrap">
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">{currentChords[5]}</span>
                  <span className="text-blue-400">→</span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">{currentChords[3]}</span>
                  <span className="text-blue-400">→</span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">{currentChords[0]}</span>
                  <span className="text-blue-400">→</span>
                  <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">{currentChords[4]}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">(vi - IV - I - V progression)</div>
              </div>
            </div>
          </div>

          <div className="text-center text-xs sm:text-sm text-gray-500">
            <p>Tap the arrows to transpose to different keys</p>
            <p className="mt-1 hidden sm:block">Roman numerals show the chord function in the scale</p>
            <p className="mt-4 hidden sm:block">Made with love by <Link className="font-semibold" href="https://github.com/Pseudoman21" target="_blank">Pseudoman21</Link></p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
