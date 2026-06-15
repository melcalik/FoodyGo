import { StyleSheet, Dimensions } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing, Radius, Shadow } from '../constants/theme';

const { width } = Dimensions.get('window');

// --- LoginScreen ---
export const LoginScreenStyles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  scroll: { flexGrow: 1, paddingBottom: 40 },

  hero: {
    paddingTop: 140,
    paddingBottom: 32,
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  heroEmoji: { fontSize: 56, marginBottom: 16 },
  heroTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },

  card: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  cardTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },

  inputGroup: { marginBottom: Spacing.md },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    paddingHorizontal: Spacing.md,
  },
  inputIcon: { fontSize: 16, marginRight: 8 },
  input: {
    flex: 1,
    height: 48,
    color: Colors.textPrimary,
    fontSize: FontSize.md,
  },

  errorText: {
    color: Colors.error,
    fontSize: FontSize.sm,
    marginBottom: Spacing.sm,
  },
  forgotWrap: { alignSelf: 'flex-end', marginBottom: Spacing.lg },
  forgotText: { color: Colors.primary, fontSize: FontSize.sm },

  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryBtnDisabled: { opacity: 0.7 },
  primaryBtnText: {
    color: Colors.white,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.surfaceBorder },
  dividerText: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    marginHorizontal: Spacing.sm,
  },

  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: Radius.md,
    height: 48,
    marginBottom: Spacing.md,
    gap: 8,
  },
  socialIcon: { fontSize: 18 },
  socialBtnText: { color: Colors.textPrimary, fontSize: FontSize.md, fontWeight: FontWeight.medium },

  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.sm,
  },
  linkText: { color: Colors.textSecondary, fontSize: FontSize.sm },
  linkAccent: { color: Colors.primary, fontSize: FontSize.sm, fontWeight: FontWeight.semibold },
});


// --- RegisterScreen ---
export const RegisterScreenStyles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  scroll: { flexGrow: 1, paddingBottom: 40 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  backIcon: { fontSize: 20, color: Colors.textPrimary },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },

  hero: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  heroEmoji: { fontSize: 48, marginBottom: 12 },
  heroTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  heroSub: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },

  card: {
    backgroundColor: '#F5EBE0',
    marginHorizontal: Spacing.md,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },

  inputGroup: { marginBottom: Spacing.md },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.primary + '33',
    paddingHorizontal: Spacing.md,
  },
  inputIcon: { fontSize: 16, marginRight: 8 },
  input: {
    flex: 1,
    height: 48,
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    backgroundColor: Colors.surface,
  },

  errorText: {
    color: Colors.error,
    fontSize: FontSize.sm,
    marginBottom: Spacing.sm,
  },

  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryBtnDisabled: { opacity: 0.7 },
  primaryBtnText: {
    color: Colors.white,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },

  terms: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
    lineHeight: 18,
  },
  termsLink: { color: Colors.primary },

  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.md,
  },
  linkText: { color: Colors.textSecondary, fontSize: FontSize.sm },
  linkAccent: { color: Colors.primary, fontSize: FontSize.sm, fontWeight: FontWeight.semibold },

  forgotPasswordText: {
    fontSize: FontSize.sm,
    color: Colors.primaryDark,
    textAlign: 'right',
    marginTop: 8,
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.surfaceBorder,
  },
  orText: {
    marginHorizontal: Spacing.sm,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    backgroundColor: Colors.surface,
    marginBottom: Spacing.lg,
  },
  googleBtnText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginLeft: 8,
  },
});


// --- SplashScreen ---
export const SplashScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgCircle: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    backgroundColor: Colors.primary,
    opacity: 0.04,
    top: -width * 0.3,
  },
  logoWrap: {
    width: 130,
    height: 130,
    borderRadius: 32,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 16,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  appName: {
    fontSize: 42,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
    letterSpacing: -1,
    marginBottom: 10,
  },
  tagline: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 40,
  },
  dotRow: {
    flexDirection: 'row',
    gap: 6,
    position: 'absolute',
    bottom: 60,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.surfaceBorder,
  },
});


// --- CartScreen ---
export const CartScreenStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  list: { padding: Spacing.md, paddingBottom: 40 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
  },
  clearText: { fontSize: FontSize.sm, color: Colors.error },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  footer: { marginTop: Spacing.md },

  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
  },
  summaryLabel: { fontSize: FontSize.sm, color: Colors.textSecondary },
  summaryValue: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  totalRow: { borderBottomWidth: 0, paddingTop: 12 },
  totalLabel: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  totalValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extrabold,
    color: Colors.primary,
  },

  checkoutBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  checkoutText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  checkoutAmount: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.extrabold,
    color: Colors.white,
    backgroundColor: Colors.primaryDark,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radius.md,
  },

  savingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.teal + '15',
    borderWidth: 1,
    borderColor: Colors.teal + '33',
    borderRadius: Radius.md,
    padding: Spacing.sm,
    gap: 8,
  },
  savingText: { fontSize: FontSize.xs, color: Colors.teal, flex: 1, lineHeight: 18 },
});


// --- PaymentScreen ---
export const PaymentScreenStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  scroll: { padding: Spacing.md },

  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: Spacing.sm },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.textPrimary },

  amountBox: { backgroundColor: Colors.primary + '11', borderWidth: 1, borderColor: Colors.primary + '33', borderRadius: Radius.lg, padding: Spacing.lg, alignItems: 'center', marginBottom: Spacing.lg },
  amountLabel: { fontSize: FontSize.sm, color: Colors.primary, marginBottom: 4 },
  amountValue: { fontSize: 32, fontWeight: FontWeight.extrabold, color: Colors.primary },

  sectionTitle: { fontSize: FontSize.md, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: Spacing.sm },
  selectorGroup: { marginBottom: Spacing.lg },
  selectorItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, padding: Spacing.md, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.surfaceBorder, marginBottom: Spacing.sm },
  selectorItemActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '05' },
  selectorRadio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: Colors.surfaceBorder, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.sm },
  selectorRadioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.primary },
  selectorName: { fontSize: FontSize.md, fontWeight: 'bold', color: Colors.textPrimary },
  selectorDesc: { fontSize: FontSize.xs, color: Colors.textSecondary },

  formTitle: { fontSize: FontSize.lg, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: Spacing.xs },
  form: { backgroundColor: Colors.surface, padding: Spacing.md, borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.surfaceBorder, gap: Spacing.md },
  row: { flexDirection: 'row' },
  inputGroup: { gap: 6 },
  label: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.textSecondary },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.background, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.surfaceBorder, paddingHorizontal: Spacing.md },
  input: { flex: 1, height: 52, color: Colors.textPrimary, fontSize: FontSize.md, backgroundColor: Colors.background, paddingHorizontal: Spacing.md },

  noteBox: { flexDirection: 'row', backgroundColor: Colors.surfaceElevated, padding: Spacing.md, borderRadius: Radius.md, marginTop: Spacing.md, gap: 10 },
  noteText: { flex: 1, fontSize: FontSize.xs, color: Colors.textSecondary, lineHeight: 18 },

  footer: { padding: Spacing.md, backgroundColor: Colors.background, borderTopWidth: 1, borderTopColor: Colors.surfaceBorder },
  payBtn: { backgroundColor: Colors.primary, borderRadius: Radius.lg, height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  payBtnDisabled: { opacity: 0.7 },
  payBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
  payBtnAmount: { fontSize: FontSize.md, fontWeight: 'bold', color: Colors.white, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: Spacing.lg },
  modalContent: { backgroundColor: Colors.surface, borderRadius: Radius.lg, padding: Spacing.lg, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  modalTitle: { fontSize: FontSize.lg, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: Spacing.sm },
  modalDesc: { fontSize: FontSize.sm, color: Colors.textSecondary },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: Spacing.lg },
  modalBtn: { paddingHorizontal: Spacing.lg, paddingVertical: 12, borderRadius: Radius.md, flex: 1, alignItems: 'center' },
  modalBtnText: { fontSize: FontSize.md, fontWeight: 'bold', color: Colors.white },
});


// --- PaymentSuccessScreen ---
export const PaymentSuccessScreenStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  check: {
    fontSize: 50,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
    marginBottom: Spacing.xl,
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    gap: 12,
  },
  statsEmoji: { fontSize: 24 },
  statsText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  statsBold: { fontWeight: FontWeight.bold },

  footer: {
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  btnSecondary: {
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  btnSecondaryText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
});


// --- HomeScreen ---
export const HomeScreenStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  list: {},

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  greeting: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  location: { fontSize: FontSize.sm, color: Colors.textSecondary },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Colors.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  notifBadgeText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: 'bold',
  },

  searchRow: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
  },

  impactBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.teal + '18',
    borderWidth: 1,
    borderColor: Colors.teal + '33',
    borderRadius: 12,
    marginHorizontal: Spacing.md,
    padding: Spacing.md,
    gap: 12,
  },
  impactText: { flex: 1 },
  impactTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.teal,
  },
  impactSub: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  sectionCount: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },

  empty: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});


// --- OrderHistoryScreen ---
export const OrderHistoryScreenStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  list: { padding: Spacing.md, paddingBottom: 40 },

  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
  },

  empty: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  restaurantImage: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    marginRight: Spacing.sm,
  },
  headerInfo: { flex: 1 },
  restaurantName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  date: { fontSize: FontSize.xs, color: Colors.textMuted },
  
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  statusSuccess: { backgroundColor: Colors.success + '11', borderColor: Colors.success + '33' },
  statusSuccessText: { color: Colors.success, fontSize: 10, fontWeight: 'bold' },
  statusActive: { backgroundColor: Colors.primary + '11', borderColor: Colors.primary + '33' },
  statusActiveText: { color: Colors.primary, fontSize: 10, fontWeight: 'bold' },

  itemsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
    marginBottom: Spacing.sm,
  },
  itemsSummary: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginRight: Spacing.sm,
  },
  totalPrice: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },

  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  btnSecondary: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  btnSecondaryText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  btnSecondaryDisabled: {
    opacity: 0.5,
    backgroundColor: Colors.surfaceElevated,
  },
  btnSecondaryTextDisabled: {
    color: Colors.textMuted,
  },
  btnPrimary: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    backgroundColor: Colors.primary + '15',
  },
  btnPrimaryText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
});


// --- OrderTrackingScreen ---
export const OrderTrackingScreenStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.md, paddingBottom: 40 },

  errorText: { textAlign: 'center', marginTop: 40, fontSize: FontSize.md },
  backBtn: { alignSelf: 'center', marginTop: 20, padding: 10 },
  backBtnText: { color: Colors.primary, fontWeight: 'bold' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },

  mapPlaceholder: {
    height: 200,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    position: 'relative',
    overflow: 'hidden',
  },
  mapText: { fontSize: FontSize.sm, color: Colors.textMuted },
  codeCard: {
    position: 'absolute',
    bottom: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  codeLabel: { fontSize: 10, color: Colors.textSecondary, marginBottom: 2 },
  codeValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.primary },

  trackerCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Spacing.md,
  },
  trackerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  stepper: { paddingLeft: 10 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start' },
  stepIndicator: { alignItems: 'center', width: 40 },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 2,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  stepCircleActive: {
    backgroundColor: Colors.primary + '22',
    borderColor: Colors.primary,
  },
  stepLine: {
    width: 2,
    height: 30,
    backgroundColor: Colors.surfaceBorder,
    marginVertical: -2,
    zIndex: 1,
  },
  stepLineActive: { backgroundColor: Colors.primary },
  
  stepInfo: { flex: 1, height: 36, justifyContent: 'center', marginLeft: 12 },
  stepTitle: { fontSize: FontSize.md, fontWeight: FontWeight.medium, color: Colors.textMuted },
  stepTitleActive: { color: Colors.textPrimary, fontWeight: FontWeight.bold },
  stepDesc: { fontSize: FontSize.xs, color: Colors.primary, marginTop: 4, fontWeight: FontWeight.medium },

  detailsCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  detailsTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  itemsList: {
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
    paddingVertical: Spacing.sm,
    gap: 8,
    marginBottom: Spacing.sm,
  },
  itemRow: { flexDirection: 'row', alignItems: 'center' },
  itemQty: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.primary, width: 24 },
  itemName: { flex: 1, fontSize: FontSize.sm, color: Colors.textPrimary },
  itemPrice: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  
  suspendedBadge: {
    backgroundColor: Colors.teal + '22',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  suspendedText: { fontSize: 10, color: Colors.teal, fontWeight: 'bold' },

  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  totalValue: { fontSize: FontSize.lg, fontWeight: FontWeight.extrabold, color: Colors.primary },
});


// --- ReviewScreen ---
export const ReviewScreenStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  scroll: { padding: Spacing.md },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },

  infoCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  restaurantName: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: 4 },
  itemsText: { fontSize: FontSize.sm, color: Colors.textSecondary, textAlign: 'center' },

  questionText: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },

  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },

  ratingLabel: {
    textAlign: 'center',
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },

  inputWrap: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    padding: Spacing.md,
    height: 120,
  },
  input: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
  },

  footer: {
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
    backgroundColor: Colors.background,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnDisabled: { opacity: 0.5 },
  submitBtnText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
});


// --- EditProfileScreen ---
export const EditProfileScreenStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  scroll: { padding: Spacing.md },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },

  form: { gap: Spacing.lg, marginTop: Spacing.md },
  inputGroup: { gap: 8 },
  label: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.textSecondary },
  input: {
    height: 52,
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    paddingHorizontal: Spacing.md,
  },

  footer: {
    padding: Spacing.md,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveBtnDisabled: { opacity: 0.7 },
  saveBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
});


// --- PaymentMethodsScreen ---
export const PaymentMethodsScreenStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.md },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.surfaceBorder },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  addBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  addBtnText: { fontSize: 24, color: Colors.white, lineHeight: 26 },
  
  formCard: { backgroundColor: Colors.surface, margin: Spacing.md, padding: Spacing.md, borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.surfaceBorder },
  formTitle: { fontSize: FontSize.lg, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: Spacing.md },
  inputGroup: { marginBottom: Spacing.sm },
  label: { fontSize: FontSize.xs, color: Colors.textSecondary, marginBottom: 4 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.background, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.surfaceBorder, paddingHorizontal: Spacing.md },
  input: { flex: 1, color: Colors.textPrimary, backgroundColor: Colors.background, borderRadius: Radius.md, height: 45, paddingHorizontal: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder },
  row: { flexDirection: 'row' },
  submitBtn: { backgroundColor: Colors.primary, height: 45, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center', marginTop: Spacing.sm },
  submitBtnText: { color: Colors.white, fontWeight: 'bold' },

  list: { padding: Spacing.md },
  cardItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, padding: Spacing.md, borderRadius: Radius.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.surfaceBorder },
  cardInfo: { flex: 1 },
  cardName: { fontSize: FontSize.md, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 4 },
  cardNumber: { fontSize: FontSize.sm, color: Colors.textSecondary },
  lastUsedBadge: { fontSize: FontSize.xs, color: Colors.primary, fontWeight: 'normal' },
  actionBtn: { padding: Spacing.sm },
  emptyText: { textAlign: 'center', color: Colors.textMuted, marginTop: 50 },
});


// --- ProfileScreen ---
export const ProfileScreenStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: Spacing.md, paddingBottom: 40 },

  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
  },

  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary + '22',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  avatarText: { fontSize: 24, fontWeight: 'bold', color: Colors.primary },
  userInfo: { flex: 1 },
  userName: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: 4 },
  userEmail: { fontSize: FontSize.sm, color: Colors.textSecondary },
  editBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  editBtnText: { fontSize: FontSize.xs, fontWeight: 'bold', color: Colors.textPrimary },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Spacing.xl,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.primary, marginBottom: 2 },
  statLabel: { fontSize: 10, color: Colors.textSecondary, textAlign: 'center' },
  statDivider: { width: 1, height: 30, backgroundColor: Colors.surfaceBorder },

  moneySavedBox: {
    backgroundColor: Colors.primary + '15',
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  moneySavedText: { fontSize: FontSize.md, color: Colors.textPrimary, textAlign: 'center' },
  moneySavedVal: { fontWeight: FontWeight.bold, color: Colors.primary },

  menuGroup: { marginBottom: Spacing.lg },
  menuTitle: {
    fontSize: FontSize.md,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  menuItemIcon: { marginRight: Spacing.md },
  menuItemText: { flex: 1, fontSize: FontSize.md, color: Colors.textPrimary },
  menuItemArrow: { },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.error + '15',
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.error + '33',
    marginTop: Spacing.md,
  },
  logoutBtnText: {
    fontSize: FontSize.md,
    fontWeight: 'bold',
    color: Colors.error,
  },

  version: {
    textAlign: 'center',
    marginTop: Spacing.xl,
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
});


// --- RestaurantDetailScreen ---
export const RestaurantDetailScreenStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  list: { paddingBottom: 80 },

  coverWrap: { position: 'relative', height: 260 },
  cover: { width: '100%', height: '100%' },
  coverGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: Colors.background,
    opacity: 0.7,
  },
  backBtn: {
    position: 'absolute',
    top: 48,
    left: Spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoCard: {
    marginTop: -20,
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  restaurantName: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary,
    flex: 1,
  },
  statusPill: {
    backgroundColor: Colors.success + '22',
    borderWidth: 1,
    borderColor: Colors.success,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  statusPillClosed: {
    backgroundColor: Colors.textMuted + '22',
    borderColor: Colors.textMuted,
  },
  statusText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: Colors.success },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statVal: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  statLabel: { fontSize: FontSize.xs, color: Colors.textMuted },
  statDivider: { width: 1, height: 20, backgroundColor: Colors.surfaceBorder, marginHorizontal: 4 },

  address: { fontSize: FontSize.xs, color: Colors.textSecondary },

  suspendedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.teal + '18',
    borderWidth: 1,
    borderColor: Colors.teal + '44',
    borderRadius: Radius.md,
    padding: Spacing.sm,
    gap: 8,
  },
  suspendedBannerText: { fontSize: FontSize.xs, color: Colors.teal, flex: 1, fontWeight: FontWeight.medium },

  tabs: {
    flexDirection: 'row',
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: 4,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: Radius.md,
  },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: Colors.textSecondary },
  tabTextActive: { color: Colors.white, fontWeight: FontWeight.semibold },

  itemWrap: { paddingHorizontal: Spacing.md },

  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { fontSize: FontSize.md, color: Colors.textSecondary },
});


// --- SuspendedMealScreen ---
export const SuspendedMealScreenStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 40 },

  hero: {
    backgroundColor: Colors.teal,
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: FontWeight.extrabold,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  heroSubtitle: {
    fontSize: FontSize.md,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.9,
  },

  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    marginTop: -30,
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    position: 'relative',
    overflow: 'hidden',
  },
  statLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: 4, zIndex: 2 },
  statValue: { fontSize: 32, fontWeight: FontWeight.extrabold, color: Colors.teal, zIndex: 2 },
  statEmoji: { position: 'absolute', right: -10, bottom: -10, opacity: 0.1, zIndex: 1 },

  listSection: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  emptyCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  emptyText: { fontSize: FontSize.sm, color: Colors.textSecondary },

  mealCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: Radius.md,
    marginRight: Spacing.md,
    backgroundColor: Colors.surfaceElevated,
  },
  mealInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  mealBoxName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  mealRestaurantName: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  mealDonor: {
    fontSize: 10,
    color: Colors.teal,
    fontWeight: FontWeight.medium,
  },
  claimBtn: {
    backgroundColor: Colors.teal,
    paddingHorizontal: 16,
    height: 36,
    width: 115,
    borderRadius: Radius.md,
    marginLeft: Spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  claimBtnText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: FontSize.sm,
  },
});



export const RestaurantReviewsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    zIndex: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginRight: 40,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  content: {
    padding: Spacing.lg,
  },
  listContent: {
    paddingBottom: Spacing.xxl,
  },
  reviewCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  avatarInitial: {
    color: Colors.primaryDark,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  userName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  date: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  comment: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginTop: Spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
    marginTop: 40,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.lg,
    textAlign: 'center',
  },
});

// Temporarily appending here. If doing a real refactor, would merge into RestaurantReviewsScreenStyles.
export const RestaurantReviewsExtraStyles = StyleSheet.create({
  orderItemsText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  }
});
