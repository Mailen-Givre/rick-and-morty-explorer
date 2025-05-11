'use client';

import React, { useState } from 'react';
import CharacterList from './components/CharacterList';
import EpisodeList from './components/EpisodeList';
import { useCharacters } from './hooks/useCharacters';
import { useEpisodes } from './hooks/useEpisodes';
import { Character } from './api/rickAndMorty';
export default function Home() {
  const [selectedCharacter1, setSelectedCharacter1] = useState<Character | null>(null);
  const [selectedCharacter2, setSelectedCharacter2] = useState<Character | null>(null);

  // Character data for the first list
  const {
    characters: characters1,
    loading: loading1,
    error: error1,
    pagination: pagination1,
    goToPage: goToPage1,
  } = useCharacters(1);

  // Character data for the second list
  const {
    characters: characters2,
    loading: loading2,
    error: error2,
    pagination: pagination2,
    goToPage: goToPage2,
  } = useCharacters(1);

  // Episodes data
  const {
    character1Episodes,
    character2Episodes,
    sharedEpisodes,
    loading: loadingEpisodes,
    error: errorEpisodes,
  } = useEpisodes(selectedCharacter1, selectedCharacter2);

  // Handle character selection
  const handleSelectCharacter1 = (character: Character) => {
    setSelectedCharacter1(prevChar =>
      prevChar?.id === character.id ? null : character
    );
  };

  const handleSelectCharacter2 = (character: Character) => {
    setSelectedCharacter2(prevChar =>
      prevChar?.id === character.id ? null : character
    );
  };

  // Check if we should show episodes sections
  const showEpisodeSections = selectedCharacter1 !== null || selectedCharacter2 !== null;
  const showSharedSection = selectedCharacter1 !== null && selectedCharacter2 !== null;
  const showChar1Section = selectedCharacter1 !== null;
  const showChar2Section = selectedCharacter2 !== null;

  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Rick and Morty Explorer</h1>
          <p className="text-gray-600">Select characters to see their episodes</p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Character List #1 */}
          <CharacterList
            title="Character #1"
            characters={characters1}
            loading={loading1}
            error={error1}
            selectedCharacter={selectedCharacter1}
            onSelectCharacter={handleSelectCharacter1}
            pagination={pagination1}
            onPageChange={goToPage1}
          />

          {/* Character List #2 */}
          <CharacterList
            title="Character #2"
            characters={characters2}
            loading={loading2}
            error={error2}
            selectedCharacter={selectedCharacter2}
            onSelectCharacter={handleSelectCharacter2}
            pagination={pagination2}
            onPageChange={goToPage2}
          />
        </div>

        {/* Episode Sections */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Episodes</h2>

          {/* Validation message when no characters are selected */}
          {!showChar1Section && !showChar2Section && (
            <div className="text-center p-4 bg-yellow-100 text-yellow-700 rounded-lg">
              Please select at least one character to view episodes.
            </div>
          )}

          {showEpisodeSections && (
            <>
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Character #1 Episodes */}
                {showChar1Section && (
                  <EpisodeList
                    title="Character #1 - Only Episodes"
                    episodes={character1Episodes}
                    loading={loadingEpisodes}
                    error={errorEpisodes}
                    character1Name={selectedCharacter1?.name}
                    emptyMessage={selectedCharacter2
                      ? `No episodes found exclusive to ${selectedCharacter1?.name}`
                      : "No episodes found for this character"
                    }
                  />
                )}


                {/* Character #2 Episodes */}
                {showChar2Section && (
                  <EpisodeList
                    title="Character #2 - Only Episodes"
                    episodes={character2Episodes}
                    loading={loadingEpisodes}
                    error={errorEpisodes}
                    character2Name={selectedCharacter2?.name}
                    emptyMessage={selectedCharacter1
                      ? `No episodes found exclusive to ${selectedCharacter2?.name}`
                      : "No episodes found for this character"
                    }
                  />
                )}
              </div>

              {/* Shared Episodes */}
              {showSharedSection && (
                <EpisodeList
                  title="Character #1 & Character #2 - Shared Episodes"
                  episodes={sharedEpisodes}
                  loading={loadingEpisodes}
                  error={errorEpisodes}
                  character1Name={selectedCharacter1?.name}
                  character2Name={selectedCharacter2?.name}
                  emptyMessage={`No shared episodes between ${selectedCharacter1?.name} and ${selectedCharacter2?.name}`}
                />
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}