import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, 
  SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform,
  Image, Animated, Modal, FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';

// Tipos
type Mood = {
  id: number;
  name: string;
  face: string;
  color: string;
};

type JournalEntry = {
  id: number;
  title: string;
  content: string;
  mood: Mood;
  date: Date;
  tags: string[];
};

type RootStackParamList = {
  EmotionJournal: { selectedMood: Mood | null };
};

type EmotionJournalScreenRouteProp = RouteProp<RootStackParamList, 'EmotionJournal'>;

type Props = {
  route: EmotionJournalScreenRouteProp;
};

const EmotionJournalScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { selectedMood } = route.params || { selectedMood: null };
  
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentMood, setCurrentMood] = useState<Mood | null>(selectedMood || null);
  const [isCreatingEntry, setIsCreatingEntry] = useState(false);
  const [showEntryDetail, setShowEntryDetail] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEntries, setFilteredEntries] = useState<JournalEntry[]>([]);
  const [animation] = useState(new Animated.Value(0));
  const [showMoodSelector, setShowMoodSelector] = useState(false);

  const moods: Mood[] = [
    { id: 1, name: 'Contento', face: '😊', color: '#FDFFB6' },
    { id: 2, name: 'Triste', face: '😢', color: '#B5D0E6' },
    { id: 3, name: 'Enojado', face: '😠', color: '#F28B82' }
  ];

  const suggestedTags: string[] = ['Trabajo', 'Familia', 'Amigos', 'Salud'];

  // Ejemplo de entrada
  useEffect(() => {
    const sampleEntry: JournalEntry = {
      id: 1,
      title: 'Día de mierda',
      content: 'Hoy fue un dia de mierda trabajando.',
      mood: moods[0],
      date: new Date(),
      tags: ['Trabajo', 'Logros']
    };
    setJournalEntries([sampleEntry]);
    setFilteredEntries([sampleEntry]);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEntries(journalEntries);
    } else {
      const filtered = journalEntries.filter(entry => 
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        entry.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEntries(filtered);
    }
  }, [searchQuery, journalEntries]);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isCreatingEntry ? 1 : 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [isCreatingEntry]);

  const addNewEntry = () => {
    if (currentTitle.trim() === '' || currentEntry.trim() === '' || !currentMood) {
      alert('Por favor completa todos los campos');
      return;
    }

    const newEntry: JournalEntry = {
      id: journalEntries.length + 1,
      title: currentTitle,
      content: currentEntry,
      mood: currentMood,
      date: new Date(),
      tags: selectedTags
    };

    setJournalEntries([newEntry, ...journalEntries]);
    setFilteredEntries([newEntry, ...journalEntries]);
    resetEntryForm();
    setIsCreatingEntry(false);
  };

  const resetEntryForm = () => {
    setCurrentTitle('');
    setCurrentEntry('');
    setSelectedTags([]);
    setCurrentMood(null);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag) 
        ? prevTags.filter(t => t !== tag) 
        : [...prevTags, tag]
    );
  };

  const viewEntryDetails = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setShowEntryDetail(true);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderJournalEntry = ({ item }: { item: JournalEntry }) => (
    <TouchableOpacity 
      style={[styles.entryCard, { borderLeftColor: item.mood.color }]} 
      onPress={() => viewEntryDetails(item)}
    >
      <View style={styles.entryHeader}>
        <Text style={styles.entryTitle}>{item.title}</Text>
        <Text style={styles.entryEmoji}>{item.mood.face}</Text>
      </View>
      
      <Text style={styles.entryPreview} numberOfLines={2}>
        {item.content}
      </Text>
      
      <View style={styles.entryFooter}>
        <Text style={styles.entryDate}>
          {item.date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
        </Text>
        
        <View style={styles.entryTags}>
          {item.tags.slice(0, 2).map((tag, index) => (
            <View key={index} style={styles.tagChip}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  const MoodSelector = () => (
    <Modal
      animationType="fade"
      transparent
      visible={showMoodSelector}
      onRequestClose={() => setShowMoodSelector(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setShowMoodSelector(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.moodSelectorContainer}>
            <Text style={styles.moodSelectorTitle}>¿Cómo te sientes?</Text>
            <View style={styles.moodGrid}>
              {moods.map((mood) => (
                <TouchableOpacity
                  key={mood.id}
                  style={[styles.moodItem, { backgroundColor: mood.color }]}
                  onPress={() => {
                    setCurrentMood(mood);
                    setShowMoodSelector(false);
                  }}
                >
                  <Text style={styles.moodFace}>{mood.face}</Text>
                  <Text style={styles.moodName}>{mood.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const EntryDetailModal = () => (
    <Modal
      animationType="slide"
      transparent
      visible={showEntryDetail}
      onRequestClose={() => setShowEntryDetail(false)}
    >
      <View style={styles.detailModalContainer}>
        <View style={styles.detailModalContent}>
          <View style={styles.detailModalHeader}>
            <TouchableOpacity onPress={() => setShowEntryDetail(false)}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={[styles.moodIndicator, { backgroundColor: selectedEntry?.mood.color }]}>
              {selectedEntry?.mood.name} {selectedEntry?.mood.face}
            </Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.detailTitle}>{selectedEntry?.title}</Text>
            <Text style={styles.detailDate}>{selectedEntry ? formatDate(selectedEntry.date) : ''}</Text>
            
            <View style={styles.detailTagsContainer}>
              {selectedEntry?.tags.map((tag, index) => (
                <View key={index} style={styles.detailTagChip}>
                  <Text style={styles.detailTagText}>{tag}</Text>
                </View>
              ))}
            </View>
            
            <Text style={styles.detailContent}>{selectedEntry?.content}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const entryFormTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '0%']
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mi Diario Emocional</Text>
        </View>
      </View>

      <View style={styles.content}>
        {filteredEntries.length > 0 ? (
          <FlatList
            data={filteredEntries}
            renderItem={renderJournalEntry}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.entriesList}
          />
        ) : (
          <View style={styles.emptyState}>
            <Image 
              source={{ uri: 'https://placehold.co/120x120' }}
              style={styles.emptyStateImage}
            />
            <Text style={styles.emptyStateTitle}>Tu diario está vacío</Text>
            <Text style={styles.emptyStateText}>
              Comienza a registrar tus emociones y experiencias
            </Text>
          </View>
        )}
      </View>

      {!isCreatingEntry && (
        <TouchableOpacity 
          style={styles.fabButton}
          onPress={() => setIsCreatingEntry(true)}
        >
          <Ionicons name="add" size={28} color="#FFF" />
        </TouchableOpacity>
      )}

      <Animated.View 
        style={[
          styles.entryFormContainer, 
          { transform: [{ translateY: entryFormTranslateY }] }
        ]}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.entryFormHeader}>
            <Text style={styles.entryFormTitle}>Nueva entrada</Text>
            <TouchableOpacity onPress={() => setIsCreatingEntry(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.entryForm} keyboardShouldPersistTaps="handled">
            <TouchableOpacity 
              style={styles.moodSelectorButton}
              onPress={() => setShowMoodSelector(true)}
            >
              {currentMood ? (
                <View style={styles.selectedMoodContainer}>
                  <Text style={styles.selectedMoodEmoji}>{currentMood.face}</Text>
                  <Text style={styles.selectedMoodText}>Me siento {currentMood.name}</Text>
                </View>
              ) : (
                <View style={styles.selectMoodPrompt}>
                  <Ionicons name="happy-outline" size={24} color="#888" />
                  <Text style={styles.selectMoodText}>¿Cómo te sientes hoy?</Text>
                </View>
              )}
            </TouchableOpacity>

            <TextInput
              style={styles.titleInput}
              placeholder="Título"
              value={currentTitle}
              onChangeText={setCurrentTitle}
              maxLength={60}
            />

            <TextInput
              style={styles.contentInput}
              placeholder="¿Qué sucedió? ¿Qué estás pensando?"
              value={currentEntry}
              onChangeText={setCurrentEntry}
              multiline
              textAlignVertical="top"
            />

            <Text style={styles.tagsTitle}>Etiquetas</Text>
            <View style={styles.tagsContainer}>
              {suggestedTags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tagOption,
                    selectedTags.includes(tag) && styles.selectedTagOption
                  ]}
                  onPress={() => toggleTag(tag)}
                >
                  <Text 
                    style={[
                      styles.tagOptionText,
                      selectedTags.includes(tag) && styles.selectedTagOptionText
                    ]}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.formActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setIsCreatingEntry(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={addNewEntry}
              >
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Animated.View>

      <MoodSelector />
      <EntryDetailModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6EF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E5E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
  },
  content: {
    flex: 1,
  },
  entriesList: {
    padding: 15,
  },
  entryCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  entryEmoji: {
    fontSize: 20,
  },
  entryPreview: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    lineHeight: 20,
  },
  entryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryDate: {
    fontSize: 12,
    color: '#888',
  },
  entryTags: {
    flexDirection: 'row',
  },
  tagChip: {
    backgroundColor: '#F0E5E0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 6,
  },
  tagText: {
    fontSize: 11,
    color: '#666',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
  fabButton: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#65B891',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  entryFormContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '90%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  entryFormHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E5E0',
  },
  entryFormTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  entryForm: {
    flex: 1,
    padding: 20,
  },
  moodSelectorButton: {
    backgroundColor: '#F0E5E0',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  selectedMoodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedMoodEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  selectedMoodText: {
    fontSize: 16,
    color: '#333',
  },
  selectMoodPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectMoodText: {
    fontSize: 16,
    color: '#888',
    marginLeft: 8,
  },
  titleInput: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  contentInput: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    height: 150,
    marginBottom: 20,
  },
  tagsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tagOption: {
    backgroundColor: '#F0E5E0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedTagOption: {
    backgroundColor: '#65B891',
  },
  tagOptionText: {
    fontSize: 14,
    color: '#666',
  },
  selectedTagOptionText: {
    color: '#FFF',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#65B891',
  },
  cancelButtonText: {
    color: '#65B891',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#65B891',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  moodSelectorContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 25,
    width: '90%',
    maxWidth: 400,
  },
  moodSelectorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  moodItem: {
    width: '28%',
    aspectRatio: 1,
    margin: 8,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  moodFace: {
    fontSize: 30,
    marginBottom: 5,
  },
  moodName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  detailModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  detailModalContent: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  detailModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  moodIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  detailTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  detailTagChip: {
    backgroundColor: '#F0E5E0',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  detailTagText: {
    fontSize: 14,
    color: '#666',
  },
  detailContent: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  }
});

export default EmotionJournalScreen;