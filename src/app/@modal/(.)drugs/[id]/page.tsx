//'use client';

//import { useRouter } from 'next/navigation';
//import { useDrug } from '@/hooks/useDrug';
//import { Modal } from '@/components/ui/Modal';
//import { DrugDetails } from '@/components/common/DrugDetails';

//export default function InterceptedDrugModal({ params }: { params: { id: string } }) {
  //const router = useRouter();
  //const { data: drug, isLoading } = useDrug(params.id);

  //return (
    //<Modal open onClose={() => router.back()}>
      //{isLoading ? <div>Загрузка...</div> : <DrugDetails drug={drug} />}
    //</Modal>
  //);
//}

export default function InterceptedDrugModal() {
  return null;
}