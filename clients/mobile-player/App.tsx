import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

const initialBadges = [
  { name: 'Sprint Master', unlocked: true, desc: 'Acquire average Speed rating above 8/10' },
  { name: 'Iron Shield', unlocked: true, desc: 'Enrolled in central defense U17 squads' },
  { name: 'Goal Machine', unlocked: false, desc: 'Complete 10 forward scoring exercises' },
  { name: 'Tactical Mind', unlocked: false, desc: 'Acquire tactics assessment score above 9/10' }
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'status' | 'achievements'>('status');
  const [badges, setBadges] = useState(initialBadges);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* =========================================================
          TOP NAVIGATION HEADER
          ========================================================= */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>ATHLETICA PLAYER</Text>
          <Text style={styles.headerSub}>Player Profile: Youssef Msakni</Text>
        </View>
        <View style={styles.rankPill}>
          <Text style={styles.rankPillText}>⭐ ELITE RANK</Text>
        </View>
      </View>

      {/* =========================================================
          TAB TOGGLERS SCREEN SWITCH
          ========================================================= */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabBtn, activeScreen === 'status' && styles.tabBtnActive]} 
          onPress={() => setActiveScreen('status')}
        >
          <Text style={[styles.tabBtnText, activeScreen === 'status' && styles.tabBtnTextActive]}>📊 Stats & Ranks</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabBtn, activeScreen === 'achievements' && styles.tabBtnActive]} 
          onPress={() => setActiveScreen('achievements')}
        >
          <Text style={[styles.tabBtnText, activeScreen === 'achievements' && styles.tabBtnTextActive]}>🏆 Badges Catalog</Text>
        </TouchableOpacity>
      </View>

      {/* =========================================================
          SCREEN PANEL 1: STATUS & PERFORMANCE XP
          ========================================================= */}
      {activeScreen === 'status' && (
        <ScrollView style={styles.scrollWorkspace}>
          
          {/* Overall Gamification XP Card */}
          <View style={styles.xpCard}>
            <Text style={styles.xpHeader}>ACCUMULATED EXPERIENCE POINTS</Text>
            <h2 style={{ fontSize: 36, fontWeight: '800', color: '#f59e0b', marginVertical: 10 }}>4,200 XP</h2>
            
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarActive}></View>
            </View>
            
            <View style={styles.xpRow}>
              <Text style={styles.xpLabel}>Level Progress (80%)</Text>
              <Text style={styles.xpLabel}>800 XP to next Rank up</Text>
            </View>
          </View>

          {/* Performance Radar Breakdown */}
          <Text style={styles.sectionTitle}>Performance Indices</Text>
          
          <View style={styles.glassCard}>
            <View style={styles.statItem}>
              <View style={styles.statLabelRow}>
                <Text style={styles.statName}>Speed Acceleration</Text>
                <Text style={styles.statVal}>8.5 / 10</Text>
              </View>
              <View style={styles.meterContainer}>
                <View style={[styles.meterActive, { width: '85%', background: '#38bdf8' }]}></View>
              </View>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statLabelRow}>
                <Text style={styles.statName}>Technical Footwork</Text>
                <Text style={styles.statVal}>8.0 / 10</Text>
              </View>
              <View style={styles.meterContainer}>
                <View style={[styles.meterActive, { width: '80%', background: '#a855f7' }]}></View>
              </View>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statLabelRow}>
                <Text style={styles.statName}>Tactical Scrimmage Pressing</Text>
                <Text style={styles.statVal}>7.0 / 10</Text>
              </View>
              <View style={styles.meterContainer}>
                <View style={[styles.meterActive, { width: '70%', background: '#f59e0b' }]}></View>
              </View>
            </View>
          </View>

          {/* Billing Overview */}
          <Text style={styles.sectionTitle}>Invoices & Payments</Text>
          <View style={[styles.glassCard, { marginBottom: 40 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}>Spring Season Membership</Text>
                <Text style={{ color: '#6b7280', fontSize: 10, marginTop: 2 }}>Issued: 2026-05-01</Text>
              </View>
              <View style={styles.payBadge}>
                <Text style={styles.payBadgeText}>PAID via Konnect</Text>
              </View>
            </View>
          </View>

        </ScrollView>
      )}

      {/* =========================================================
          SCREEN PANEL 2: BADGES CATALOGUE
          ========================================================= */}
      {activeScreen === 'achievements' && (
        <ScrollView style={styles.scrollWorkspace}>
          <Text style={styles.sectionTitle}>Squad Badges & Ranks achievements</Text>
          
          <View style={styles.gridContainer}>
            {badges.map((badge, idx) => (
              <View key={idx} style={[styles.badgeCard, !badge.unlocked && styles.badgeLocked]}>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                  <Text style={{ fontSize: 24 }}>{badge.unlocked ? '🏆' : '🔒'}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.badgeName, !badge.unlocked && { color: '#6b7280' }]}>{badge.name}</Text>
                    <Text style={styles.badgeDesc}>{badge.desc}</Text>
                  </View>
                </View>

                {badge.unlocked && (
                  <View style={styles.unlockIndicator}>
                    <Text style={styles.unlockText}>UNLOCKED</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05020a',
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
    fontSize: 16,
    fontWeight: '800',
    color: '#f472b6',
    letterSpacing: -0.5
  },
  headerSub: {
    fontSize: 10,
    color: '#9ca3af',
    fontWeight: '500'
  },
  rankPill: {
    background: 'rgba(245,158,11,0.1)',
    borderWidth: 1,
    borderColor: '#f59e0b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  rankPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#f59e0b'
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
    borderBottomColor: '#f472b6'
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9ca3af'
  },
  tabBtnTextActive: {
    color: '#f472b6'
  },
  scrollWorkspace: {
    flex: 1,
    padding: 20
  },
  xpCard: {
    background: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#a855f7',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5
  },
  xpHeader: {
    fontSize: 10,
    color: '#a855f7',
    fontWeight: '800',
    letterSpacing: 0.5
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 10
  },
  progressBarActive: {
    width: '80%',
    height: '100%',
    background: 'linear-gradient(90deg, #f472b6, #a855f7)'
  },
  xpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  xpLabel: {
    fontSize: 10,
    color: '#6b7280',
    fontWeight: '500'
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
    marginTop: 15,
    marginBottom: 12
  },
  glassCard: {
    background: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 20
  },
  statItem: {
    marginBottom: 15
  },
  statLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  statName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9ca3af'
  },
  statVal: {
    fontSize: 12,
    fontWeight: '800',
    color: '#fff'
  },
  meterContainer: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 3,
    overflow: 'hidden'
  },
  meterActive: {
    height: '100%'
  },
  payBadge: {
    background: 'rgba(52,211,153,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },
  payBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#34d399'
  },
  gridContainer: {
    gap: 12,
    marginBottom: 40
  },
  badgeCard: {
    background: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  badgeLocked: {
    opacity: 0.5,
    borderColor: 'rgba(255,255,255,0.02)'
  },
  badgeName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff'
  },
  badgeDesc: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4
  },
  unlockIndicator: {
    background: 'rgba(245,158,11,0.1)',
    borderWidth: 1,
    borderColor: '#f59e0b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  unlockText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#f59e0b'
  }
});
