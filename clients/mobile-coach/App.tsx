import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from 'react-native';

const initialPlayers = [
  { id: '1', name: 'Youssef Msakni', status: 'present', speed: 8, tech: 9 },
  { id: '2', name: 'Hannibal Mejbri', status: 'present', speed: 9, tech: 8 },
  { id: '3', name: 'Aissa Laidouni', status: 'late', speed: 7, tech: 7 },
  { id: '4', name: 'Montassar Talbi', status: 'absent', speed: 6, tech: 6 }
];

export default function App() {
  const [players, setPlayers] = useState(initialPlayers);
  const [activeScreen, setActiveScreen] = useState<'attendance' | 'eval'>('attendance');
  const [selectedPlayer, setSelectedPlayer] = useState(initialPlayers[0]);
  
  // Evaluation scores input states
  const [speedVal, setSpeedVal] = useState('8');
  const [techVal, setTechVal] = useState('9');
  const [evalNotes, setEvalNotes] = useState('');

  // Toggle dynamic attendance status
  const handleToggleAttendance = (id: string) => {
    setPlayers(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'present' ? 'late' : p.status === 'late' ? 'absent' : 'present';
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const handleSelectPlayerForEval = (p: any) => {
    setSelectedPlayer(p);
    setSpeedVal(String(p.speed));
    setTechVal(String(p.tech));
    setEvalNotes('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* =========================================================
          TOP NAVIGATION HEADER
          ========================================================= */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>ATHLETICA COACH</Text>
          <Text style={styles.headerSub}>Squad: U17 Elite Category</Text>
        </View>
        <View style={styles.activePill}>
          <Text style={styles.activePillText}>CONNECTED</Text>
        </View>
      </View>

      {/* =========================================================
          TAB TOGGLERS SCREEN SWITCH
          ========================================================= */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabBtn, activeScreen === 'attendance' && styles.tabBtnActive]} 
          onPress={() => setActiveScreen('attendance')}
        >
          <Text style={[styles.tabBtnText, activeScreen === 'attendance' && styles.tabBtnTextActive]}>📅 Attendance Checklist</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabBtn, activeScreen === 'eval' && styles.tabBtnActive]} 
          onPress={() => setActiveScreen('eval')}
        >
          <Text style={[styles.tabBtnText, activeScreen === 'eval' && styles.tabBtnTextActive]}>⚽ Player Evaluations</Text>
        </TouchableOpacity>
      </View>

      {/* =========================================================
          SCREEN PANEL 1: ATTENDANCE CHECKLIST
          ========================================================= */}
      {activeScreen === 'attendance' && (
        <ScrollView style={styles.scrollWorkspace}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionTitle}>Mark Session Attendance</Text>
            <Text style={styles.sectionSub}>Tap player state to cycle present ➡️ late ➡️ absent</Text>
          </View>

          <View style={styles.listContainer}>
            {players.map(p => (
              <View key={p.id} style={styles.glassCard}>
                <View style={styles.cardInfo}>
                  <Text style={styles.playerName}>{p.name}</Text>
                  <Text style={styles.playerRole}>Squad: U17 Elite</Text>
                </View>

                <TouchableOpacity 
                  style={[
                    styles.statusBadge,
                    p.status === 'present' && styles.badgePresent,
                    p.status === 'late' && styles.badgeLate,
                    p.status === 'absent' && styles.badgeAbsent
                  ]}
                  onPress={() => handleToggleAttendance(p.id)}
                >
                  <Text style={styles.statusText}>{p.status.toUpperCase()}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>SYNC CHECKLIST TO CLOUD</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* =========================================================
          SCREEN PANEL 2: RADAR EVALUATIONS
          ========================================================= */}
      {activeScreen === 'eval' && (
        <ScrollView style={styles.scrollWorkspace}>
          <Text style={styles.sectionTitle}>Assess Performance Indices</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.playerPickerRow}>
            {players.map(p => (
              <TouchableOpacity 
                key={p.id} 
                style={[styles.pickerItem, selectedPlayer.id === p.id && styles.pickerItemActive]}
                onPress={() => handleSelectPlayerForEval(p)}
              >
                <Text style={[styles.pickerItemText, selectedPlayer.id === p.id && styles.pickerItemTextActive]}>{p.name.split(' ')[0]}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.glassCardBig}>
            <Text style={styles.evalTargetTitle}>Evaluating: {selectedPlayer.name}</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Sprinting Speed Metric (1 - 10)</Text>
              <TextInput 
                keyboardType="numeric" 
                value={speedVal} 
                onChangeText={setSpeedVal} 
                style={styles.textInput} 
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Technical Dribbling Metric (1 - 10)</Text>
              <TextInput 
                keyboardType="numeric" 
                value={techVal} 
                onChangeText={setTechVal} 
                style={styles.textInput} 
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Session Analyst Coach Notes</Text>
              <TextInput 
                multiline 
                numberOfLines={3} 
                value={evalNotes} 
                onChangeText={setEvalNotes} 
                placeholder="e.g. Excellent physical pacing during drills today." 
                placeholderTextColor="#6b7280"
                style={styles.notesInput} 
              />
            </View>

            <TouchableOpacity style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>DISPATCH ASSESSMENT TO GATEWAY</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0718',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#0d0a25'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#818cf8',
    letterSpacing: -0.5
  },
  headerSub: {
    fontSize: 11,
    color: '#9ca3af',
    fontWeight: '500'
  },
  activePill: {
    background: 'rgba(52,211,153,0.1)',
    borderWidth: 1,
    borderColor: '#34d399',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  activePillText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#34d399'
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)'
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center'
  },
  tabBtnActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#38bdf8'
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9ca3af'
  },
  tabBtnTextActive: {
    color: '#38bdf8'
  },
  scrollWorkspace: {
    flex: 1,
    padding: 20
  },
  sectionHeaderContainer: {
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4
  },
  sectionSub: {
    fontSize: 11,
    color: '#6b7280'
  },
  listContainer: {
    gap: 12
  },
  glassCard: {
    background: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardInfo: {
    flex: 1
  },
  playerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff'
  },
  playerRole: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 2
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 85,
    alignItems: 'center'
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#000'
  },
  badgePresent: {
    background: '#34d399'
  },
  badgeLate: {
    background: '#f59e0b'
  },
  badgeAbsent: {
    background: '#f472b6'
  },
  submitBtn: {
    background: 'linear-gradient(135deg, #818cf8, #38bdf8)',
    backgroundColor: '#818cf8',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 40
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 0.5
  },
  playerPickerRow: {
    marginVertical: 15,
    flexDirection: 'row'
  },
  pickerItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginRight: 10,
    backgroundColor: 'rgba(255,255,255,0.02)'
  },
  pickerItemActive: {
    borderColor: '#a855f7',
    background: 'rgba(168,85,247,0.1)'
  },
  pickerItemText: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '600'
  },
  pickerItemTextActive: {
    color: '#fff'
  },
  glassCardBig: {
    background: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 40
  },
  evalTargetTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#a855f7',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    paddingBottom: 10,
    marginBottom: 15
  },
  inputGroup: {
    marginBottom: 15
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 6
  },
  textInput: {
    background: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    fontSize: 13
  },
  notesInput: {
    background: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    fontSize: 13,
    height: 80,
    textAlignVertical: 'top'
  }
});
